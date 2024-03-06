import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, ImageBackground, View, TouchableOpacity, Platform, Alert, ScrollView} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import LogBase from '../../../../base/LogBase';
import stylesApp from '../../../../styleApp/stylesApp';
import { lichsu_thanhtoan, radiobtn_on, tick_tt } from '../../../../assets/icon';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import {avatargoi} from '../../../../assets/image';
import styles from './BuyPackageStyle'
import stringUtils from '../../../../utils/stringUtils';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { Colors } from '../../../../styleApp/color';
// import { ScrollView } from 'react-native-gesture-handler';
import IapBase from '../../../../base/IapBase';
import RNIap, {
    finishTransaction,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } from 'react-native-iap';
/**
 * BuyPackage Screen - Mua gói mới
 */

var purchaseUpdateSubscription;
var purchaseErrorSubscription;

const BuyPackage = (props) => {

    const billCodeTest1 = 'MIITzgYJKoZIhvcNAQcCoIITvzCCE7sCAQExCzAJBgUrDgMCGgUAMIIDbwYJKoZIhvcNAQcBoIIDYASCA1wxggNYMAoCAQgCAQEEAhYAMAoCARQCAQEEAgwAMAsCAQECAQEEAwIBADALAgELAgEBBAMCAQAwCwIBDwIBAQQDAgEAMAsCARACAQEEAwIBADALAgEZAgEBBAMCAQMwDAIBAwIBAQQEDAIxODAMAgEKAgEBBAQWAjQrMAwCAQ4CAQEEBAICAM0wDQIBDQIBAQQFAgMCSlQwDQIBEwIBAQQFDAMxLjAwDgIBCQIBAQQGAgRQMjU2MBcCAQICAQEEDwwNZ2suYXBwLnN1bmRheTAYAgEEAgECBBCM5drXtiKxnoB+n5yKjJ2iMBsCAQACAQEEEwwRUHJvZHVjdGlvblNhbmRib3gwHAIBBQIBAQQUnaQJoSNBj+mCnNtwYQn8zB+Gs98wHgIBDAIBAQQWFhQyMDIxLTEyLTAyVDAzOjU5OjQ1WjAeAgESAgEBBBYWFDIwMTMtMDgtMDFUMDc6MDA6MDBaMDYCAQcCAQEELpWLvgBssG0\/cSGfnAP2xdHyHPVzUGXRkyfoc4XDCxq18zekYRQknRNNi3jAQRMwVgIBBgIBAQROIwmyMZT1IQUEPRmB5gUH3jDT1ByJETEt9ldEb7aTOaDx5h21Vb56i8Tmvy3OV5hvGQqsaVmv\/JKQdnA\/4lyxJtXw7OltFx9+wnFiPWDqMIIBZQIBEQIBAQSCAVsxggFXMAsCAgasAgEBBAIWADALAgIGrQIBAQQCDAAwCwICBrACAQEEAhYAMAsCAgayAgEBBAIMADALAgIGswIBAQQCDAAwCwICBrQCAQEEAgwAMAsCAga1AgEBBAIMADALAgIGtgIBAQQCDAAwDAICBqUCAQEEAwIBATAMAgIGqwIBAQQDAgEBMAwCAgauAgEBBAMCAQAwDAICBq8CAQEEAwIBADAMAgIGsQIBAQQDAgEAMAwCAga6AgEBBAMCAQAwGwICBqcCAQEEEgwQMTAwMDAwMDkyMjM5MTIxNDAbAgIGqQIBAQQSDBAxMDAwMDAwOTIyMzkxMjE0MB0CAgamAgEBBBQMEmdrLmFwcC5zdW5kYXkuNjAwazAfAgIGqAIBAQQWFhQyMDIxLTEyLTAyVDAzOjU5OjQ1WjAfAgIGqgIBAQQWFhQyMDIxLTEyLTAyVDAzOjU5OjQ1WqCCDmUwggV8MIIEZKADAgECAggO61eH554JjTANBgkqhkiG9w0BAQUFADCBljELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xLDAqBgNVBAsMI0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zMUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTAeFw0xNTExMTMwMjE1MDlaFw0yMzAyMDcyMTQ4NDdaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQClz4H9JaKBW9aH7SPaMxyO4iPApcQmyz3Gn+xKDVWG\/6QC15fKOVRtfX+yVBidxCxScY5ke4LOibpJ1gjltIhxzz9bRi7GxB24A6lYogQ+IXjV27fQjhKNg0xbKmg3k8LyvR7E0qEMSlhSqxLj7d0fmBWQNS3CzBLKjUiB91h4VGvojDE2H0oGDEdU8zeQuLKSiX1fpIVK4cCc4Lqku4KXY\/Qrk8H9Pm\/KwfU8qY9SGsAlCnYO3v6Z\/v\/Ca\/VbXqxzUUkIVonMQ5DMjoEC0KCXtlyxoWlph5AQaCYmObgdEHOwCl3Fc9DfdjvYLdmIHuPsB8\/ijtDT+iZVge\/iA0kjAgMBAAGjggHXMIIB0zA\/BggrBgEFBQcBAQQzMDEwLwYIKwYBBQUHMAGGI2h0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtd3dkcjA0MB0GA1UdDgQWBBSRpJz8xHa3n6CK9E31jzZd7SsEhTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFIgnFwmpthhgi+zruvZHWcVSVKO3MIIBHgYDVR0gBIIBFTCCAREwggENBgoqhkiG92NkBQYBMIH+MIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDYGCCsGAQUFBwIBFipodHRwOi8vd3d3LmFwcGxlLmNvbS9jZXJ0aWZpY2F0ZWF1dGhvcml0eS8wDgYDVR0PAQH\/BAQDAgeAMBAGCiqGSIb3Y2QGCwEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQANphvTLj3jWysHbkKWbNPojEMwgl\/gXNGNvr0PvRr8JZLbjIXDgFnf4+LXLgUUrA3btrj+\/DUufMutF2uOfx\/kd7mxZ5W0E16mGYZ2+FogledjjA9z\/Ojtxh+umfhlSFyg4Cg6wBA3LbmgBDkfc7nIBf3y3n8aKipuKwH8oCBc2et9J6Yz+PWY4L5E27FMZ\/xuCk\/J4gao0pfzp45rUaJahHVl0RYEYuPBX\/UIqc9o2ZIAycGMs\/iNAGS6WGDAfK+PdcppuVsq1h1obphC9UynNxmbzDscehlD86Ntv0hgBgw2kivs3hi1EdotI9CO\/KBpnBcbnoB7OUdFMGEvxxOoMIIEIjCCAwqgAwIBAgIIAd68xDltoBAwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTEzMDIwNzIxNDg0N1oXDTIzMDIwNzIxNDg0N1owgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKOFSmy1aqyCQ5SOmM7uxfuH8mkbw0U3rOfGOAYXdkXqUHI7Y5\/lAtFVZYcC1+xG7BSoU+L\/DehBqhV8mvexj\/avoVEkkVCBmsqtsqMu2WY2hSFT2Miuy\/axiV4AOsAX2XBWfODoWVN2rtCbauZ81RZJ\/GXNG8V25nNYB2NqSHgW44j9grFU57Jdhav06DwY3Sk9UacbVgnJ0zTlX5ElgMhrgWDcHld0WNUEi6Ky3klIXh6MSdxmilsKP8Z35wugJZS3dCkTm59c3hTO\/AO0iMpuUhXf1qarunFjVg0uat80YpyejDi+l5wGphZxWy8P3laLxiX27Pmd3vG2P+kmWrAgMBAAGjgaYwgaMwHQYDVR0OBBYEFIgnFwmpthhgi+zruvZHWcVSVKO3MA8GA1UdEwEB\/wQFMAMBAf8wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwDgYDVR0PAQH\/BAQDAgGGMBAGCiqGSIb3Y2QGAgEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQBPz+9Zviz1smwvj+4ThzLoBTWobot9yWkMudkXvHcs1Gfi\/ZptOllc34MBvbKuKmFysa\/Nw0Uwj6ODDc4dR7Txk4qjdJukw5hyhzs+r0ULklS5MruQGFNrCk4QttkdUGwhgAqJTleMa1s8Pab93vcNIx0LSiaHP7qRkkykGRIZbVf1eliHe2iK5IaMSuviSRSqpd1VAKmuu0swruGgsbwpgOYJd+W+NKIByn\/c4grmO7i77LpilfMFY0GCzQ87HUyVpNur+cmV6U\/kTecmmYHpvPm0KdIBembhLoz2IYrF+Hjhga6\/05Cdqa3zr\/04GpZnMBxRpVzscYqCtGwPDBUfMIIEuzCCA6OgAwIBAgIBAjANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwHhcNMDYwNDI1MjE0MDM2WhcNMzUwMjA5MjE0MDM2WjBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkkakJH5HbHkdQ6wXtXnmELes2oldMVeyLGYne+Uts9QerIjAC6Bg++FAJ039BqJj50cpmnCRrEdCju+QbKsMflZ56DKRHi1vUFjczy8QPTc4UadHJGXL1XQ7Vf1+b8iUDulWPTV0N8WQ1IxVLFVkds5T39pyez1C6wVhQZ48ItCD3y6wsIG9wtj8BMIy3Q88PnT3zK0koGsj+zrW5DtleHNbLPbU6rfQPDgCSC7EhFi501TwN22IWq6NxkkdTVcGvL0Gz+PvjcM3mo0xFfh9Ma1CWQYnEdGILEINBhzOKgbEwWOxaBDKMaLOPHd5lc\/9nXmW8Sdh2nzMUZaF3lMktAgMBAAGjggF6MIIBdjAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH\/BAUwAwEB\/zAdBgNVHQ4EFgQUK9BpR5R2Cf70a40uQKb3R01\/CF4wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wggERBgNVHSAEggEIMIIBBDCCAQAGCSqGSIb3Y2QFATCB8jAqBggrBgEFBQcCARYeaHR0cHM6Ly93d3cuYXBwbGUuY29tL2FwcGxlY2EvMIHDBggrBgEFBQcCAjCBthqBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMA0GCSqGSIb3DQEBBQUAA4IBAQBcNplMLXi37Yyb3PN3m\/J20ncwT8EfhYOFG5k9RzfyqZtAjizUsZAS2L70c5vu0mQPy3lPNNiiPvl4\/2vIB+x9OYOLUyDTOMSxv5pPCmv\/K\/xZpwUJfBdAVhEedNO3iyM7R6PVbyTi69G3cN8PReEnyvFteO3ntRcXqNx+IjXKJdXZD9Zr1KIkIxH3oayPc4FgxhtbCS+SsvhESPBgOJ4V9T0mZyCKM2r3DYLP3uujL\/lTaltkwGMzd\/c6ByxW69oPIQ7aunMZT7XZNn\/Bh1XZp5m5MkL72NVxnn6hUrcbvZNCJBIqxw8dtk2cXmPIS4AXUKqK1drk\/NAJBzewdXUhMYIByzCCAccCAQEwgaMwgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkCCA7rV4fnngmNMAkGBSsOAwIaBQAwDQYJKoZIhvcNAQEBBQAEggEAnVWULecyr8O7J29GQLlEVahUT4gL9Cfzm7f9f3zDKEYvUDWQ\/ilz3NlRwmpGUUHoX+\/7mjqEzJcgoku8Ri\/8AKlULIfJentuNrbjHkG64IyVbVRBe1VA6hFCtIeWxZJZQvVp+X81DiZ4HE3J83\/4xuO5fz66qGflkA862ShPlL6z4qm6QyCZrjwB8sYOrP4eJjNunT1g+SSRuOP4lC2DvuUWHwMC0fwn1fnNOxU33ANchLIhI1eW0A0APx+XlH4ooIRYW\/bnkMln+hUevCOhznR0mqHpKORswF+D4QsiKF9Czm5pOKIGhxxn+7cBA3gelswiCGHw24xRiQmodQer+Q=='
    const billCodeTest2 = 'MIIT8gYJKoZIhvcNAQcCoIIT4zCCE98CAQExCzAJBgUrDgMCGgUAMIIDkwYJKoZIhvcNAQcBoIIDhASCA4AxggN8MAoCARQCAQEEAgwAMAsCARkCAQEEAwIBAzAMAgEDAgEBBAQMAjM1MAwCAQoCAQEEBBYCNCswDAIBDgIBAQQEAgIA\/jAMAgETAgEBBAQMAjIyMA0CAQ0CAQEEBQIDAkvkMA4CAQECAQEEBgIEW46yVTAOAgEJAgEBBAYCBFAyNTYwDgIBCwIBAQQGAgQHQ8Y\/MA4CARACAQEEBgIEMoWBQDASAgEPAgEBBAoCCAbzxCfPbbTVMBQCAQACAQEEDAwKUHJvZHVjdGlvbjAXAgECAgEBBA8MDWdrLmFwcC5zdW5kYXkwGAIBBAIBAgQQjizAm7Sae8l\/Uu48ksHAmTAcAgEFAgEBBBQeOPfEfkZvP5ptOyCb87\/btoWG2TAeAgEIAgEBBBYWFDIwMjItMDctMDFUMDE6NDU6MzFaMB4CAQwCAQEEFhYUMjAyMi0wNy0wMVQwMTo0NTozMVowHgIBEgIBAQQWFhQyMDIxLTEyLTEwVDA0OjA4OjE0WjA\/AgEHAgEBBDdXyuiSZhi7+1nqIqR6nh9eJnkx2FVlh5XmqS58IBM\/uH5V9+aFxobArLmUYItLv7\/R15h8+0SuMFQCAQYCAQEETHiqEd8JRU\/FGW31iJSl8FGWidP79tFWidY0BqDxxPKHYzUlEoatiPwmmNGNVsN9Nqvvl\/rrwH3Qg9mdNAb+w0PXHhbB2Gl2V5RxqYgwggFmAgERAgEBBIIBXDGCAVgwCwICBqwCAQEEAhYAMAsCAgatAgEBBAIMADALAgIGsAIBAQQCFgAwCwICBrICAQEEAgwAMAsCAgazAgEBBAIMADALAgIGtAIBAQQCDAAwCwICBrUCAQEEAgwAMAsCAga2AgEBBAIMADAMAgIGpQIBAQQDAgEBMAwCAgarAgEBBAMCAQEwDAICBq8CAQEEAwIBADAMAgIGsQIBAQQDAgEAMAwCAga6AgEBBAMCAQAwDwICBq4CAQEEBgIEX0zNMjAaAgIGpwIBAQQRDA80MTAwMDEyNDAzODI3MDIwGgICBqkCAQEEEQwPNDEwMDAxMjQwMzgyNzAyMB0CAgamAgEBBBQMEnN1bmRheS50ZW5tb250aC52MjAfAgIGqAIBAQQWFhQyMDIyLTA2LTMwVDEwOjIxOjM5WjAfAgIGqgIBAQQWFhQyMDIyLTA2LTMwVDEwOjIxOjM5WqCCDmUwggV8MIIEZKADAgECAggO61eH554JjTANBgkqhkiG9w0BAQUFADCBljELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xLDAqBgNVBAsMI0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zMUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTAeFw0xNTExMTMwMjE1MDlaFw0yMzAyMDcyMTQ4NDdaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQClz4H9JaKBW9aH7SPaMxyO4iPApcQmyz3Gn+xKDVWG\/6QC15fKOVRtfX+yVBidxCxScY5ke4LOibpJ1gjltIhxzz9bRi7GxB24A6lYogQ+IXjV27fQjhKNg0xbKmg3k8LyvR7E0qEMSlhSqxLj7d0fmBWQNS3CzBLKjUiB91h4VGvojDE2H0oGDEdU8zeQuLKSiX1fpIVK4cCc4Lqku4KXY\/Qrk8H9Pm\/KwfU8qY9SGsAlCnYO3v6Z\/v\/Ca\/VbXqxzUUkIVonMQ5DMjoEC0KCXtlyxoWlph5AQaCYmObgdEHOwCl3Fc9DfdjvYLdmIHuPsB8\/ijtDT+iZVge\/iA0kjAgMBAAGjggHXMIIB0zA\/BggrBgEFBQcBAQQzMDEwLwYIKwYBBQUHMAGGI2h0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtd3dkcjA0MB0GA1UdDgQWBBSRpJz8xHa3n6CK9E31jzZd7SsEhTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFIgnFwmpthhgi+zruvZHWcVSVKO3MIIBHgYDVR0gBIIBFTCCAREwggENBgoqhkiG92NkBQYBMIH+MIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDYGCCsGAQUFBwIBFipodHRwOi8vd3d3LmFwcGxlLmNvbS9jZXJ0aWZpY2F0ZWF1dGhvcml0eS8wDgYDVR0PAQH\/BAQDAgeAMBAGCiqGSIb3Y2QGCwEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQANphvTLj3jWysHbkKWbNPojEMwgl\/gXNGNvr0PvRr8JZLbjIXDgFnf4+LXLgUUrA3btrj+\/DUufMutF2uOfx\/kd7mxZ5W0E16mGYZ2+FogledjjA9z\/Ojtxh+umfhlSFyg4Cg6wBA3LbmgBDkfc7nIBf3y3n8aKipuKwH8oCBc2et9J6Yz+PWY4L5E27FMZ\/xuCk\/J4gao0pfzp45rUaJahHVl0RYEYuPBX\/UIqc9o2ZIAycGMs\/iNAGS6WGDAfK+PdcppuVsq1h1obphC9UynNxmbzDscehlD86Ntv0hgBgw2kivs3hi1EdotI9CO\/KBpnBcbnoB7OUdFMGEvxxOoMIIEIjCCAwqgAwIBAgIIAd68xDltoBAwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTEzMDIwNzIxNDg0N1oXDTIzMDIwNzIxNDg0N1owgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDKOFSmy1aqyCQ5SOmM7uxfuH8mkbw0U3rOfGOAYXdkXqUHI7Y5\/lAtFVZYcC1+xG7BSoU+L\/DehBqhV8mvexj\/avoVEkkVCBmsqtsqMu2WY2hSFT2Miuy\/axiV4AOsAX2XBWfODoWVN2rtCbauZ81RZJ\/GXNG8V25nNYB2NqSHgW44j9grFU57Jdhav06DwY3Sk9UacbVgnJ0zTlX5ElgMhrgWDcHld0WNUEi6Ky3klIXh6MSdxmilsKP8Z35wugJZS3dCkTm59c3hTO\/AO0iMpuUhXf1qarunFjVg0uat80YpyejDi+l5wGphZxWy8P3laLxiX27Pmd3vG2P+kmWrAgMBAAGjgaYwgaMwHQYDVR0OBBYEFIgnFwmpthhgi+zruvZHWcVSVKO3MA8GA1UdEwEB\/wQFMAMBAf8wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwDgYDVR0PAQH\/BAQDAgGGMBAGCiqGSIb3Y2QGAgEEAgUAMA0GCSqGSIb3DQEBBQUAA4IBAQBPz+9Zviz1smwvj+4ThzLoBTWobot9yWkMudkXvHcs1Gfi\/ZptOllc34MBvbKuKmFysa\/Nw0Uwj6ODDc4dR7Txk4qjdJukw5hyhzs+r0ULklS5MruQGFNrCk4QttkdUGwhgAqJTleMa1s8Pab93vcNIx0LSiaHP7qRkkykGRIZbVf1eliHe2iK5IaMSuviSRSqpd1VAKmuu0swruGgsbwpgOYJd+W+NKIByn\/c4grmO7i77LpilfMFY0GCzQ87HUyVpNur+cmV6U\/kTecmmYHpvPm0KdIBembhLoz2IYrF+Hjhga6\/05Cdqa3zr\/04GpZnMBxRpVzscYqCtGwPDBUfMIIEuzCCA6OgAwIBAgIBAjANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwHhcNMDYwNDI1MjE0MDM2WhcNMzUwMjA5MjE0MDM2WjBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkkakJH5HbHkdQ6wXtXnmELes2oldMVeyLGYne+Uts9QerIjAC6Bg++FAJ039BqJj50cpmnCRrEdCju+QbKsMflZ56DKRHi1vUFjczy8QPTc4UadHJGXL1XQ7Vf1+b8iUDulWPTV0N8WQ1IxVLFVkds5T39pyez1C6wVhQZ48ItCD3y6wsIG9wtj8BMIy3Q88PnT3zK0koGsj+zrW5DtleHNbLPbU6rfQPDgCSC7EhFi501TwN22IWq6NxkkdTVcGvL0Gz+PvjcM3mo0xFfh9Ma1CWQYnEdGILEINBhzOKgbEwWOxaBDKMaLOPHd5lc\/9nXmW8Sdh2nzMUZaF3lMktAgMBAAGjggF6MIIBdjAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH\/BAUwAwEB\/zAdBgNVHQ4EFgQUK9BpR5R2Cf70a40uQKb3R01\/CF4wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wggERBgNVHSAEggEIMIIBBDCCAQAGCSqGSIb3Y2QFATCB8jAqBggrBgEFBQcCARYeaHR0cHM6Ly93d3cuYXBwbGUuY29tL2FwcGxlY2EvMIHDBggrBgEFBQcCAjCBthqBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMA0GCSqGSIb3DQEBBQUAA4IBAQBcNplMLXi37Yyb3PN3m\/J20ncwT8EfhYOFG5k9RzfyqZtAjizUsZAS2L70c5vu0mQPy3lPNNiiPvl4\/2vIB+x9OYOLUyDTOMSxv5pPCmv\/K\/xZpwUJfBdAVhEedNO3iyM7R6PVbyTi69G3cN8PReEnyvFteO3ntRcXqNx+IjXKJdXZD9Zr1KIkIxH3oayPc4FgxhtbCS+SsvhESPBgOJ4V9T0mZyCKM2r3DYLP3uujL\/lTaltkwGMzd\/c6ByxW69oPIQ7aunMZT7XZNn\/Bh1XZp5m5MkL72NVxnn6hUrcbvZNCJBIqxw8dtk2cXmPIS4AXUKqK1drk\/NAJBzewdXUhMYIByzCCAccCAQEwgaMwgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkCCA7rV4fnngmNMAkGBSsOAwIaBQAwDQYJKoZIhvcNAQEBBQAEggEAfAUTJ7ZDmZqk3mGzW8\/dSjKWwPgwzPG\/D6H9kd3qPsc5sTr5B99QoRQccvk0a4A3DDNJVw8rJnn\/ineA1GgyHUYkDkGQNpEi2njVoW55AYZLXlNbkPdS4FHkIGG7r\/wxQ8QJO6Nqz\/st4afwPER8i1oOiMu5ixqh+mhEcXeZHIhLZX6ROFIKZBugoAV2UUp3229iB\/QlUskRs0SNJtO51megp0a9Iwb3za4k9NNHAL7FnUmr576RcZ+XJ7El3ytSGTvbqg9PFowjU0e9XSeTV\/sEipvLsBbe3OjPFTKBfB8Q3xj0hSoUAoASsj0IBQ2hQ3m3iFbk5RB3YpmrBjUSug=='
    const billCodeAndTest = 'daamnbiblhnehpofibdgjcnk.AO-J1OxQ3bLY6CLBeqqFC65bnDVfhlvCFrFX8Jt0jJI4iom4Yc4jHzEBVsU1J6d6FrP08n2tcnlkIUxsd37kPvdsTsN9e92YXQ'
    const [loading, setloading] = useState(true)
    const [dataList, setDataList] = useState([])
    const [curIndex, setCurIndex] = useState(0)
    const [pack_code_list, setPack_code_list] = useState([])

    useEffect(() => {
        IapBase.connect();
        IapBase.KeepCheckError();
        setupIAP()

        getData()

        return function cleanIap () { 
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
                purchaseUpdateSubscription = null;
              }
              if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
                purchaseErrorSubscription = null;
              }
              RNIap.endConnection();
          } 

    },[])

    const getData = async () => {

        var url = API.baseurl_pay + API.package
        console.log("=====getProductionList url",url)
        // setLoading(true)
        try{
            const res = await APIBase.callPaySV('get', url)
            // if(res.data.status){
                LogBase.log("=====getProductionList",res.data)
                LogBase.log("=====package_list",res.data.data.package_list)
                var mlist = res.data.data.package_list
                var convertList = convertData(res.data.data.package_list)
                // setDataList(convertList)
                setDataList(res.data.data.package_list)
                var listPro = []
                // for(var i=0;i<convertList[0].packList.length;i++){
                //     if(convertList[0].packList[i]){
                //         if(Platform.OS == 'android'){
                //             listPro.push(convertList[0].packList[i].package_code_android)
                //         }else{
                //             listPro.push(convertList[0].packList[i].package_code_ios)
                //         }
                //     }
                // }
                for(var i=0;i<mlist.length;i++){
                    if(mlist[i]){
                        if(Platform.OS == 'android'){
                            listPro.push(mlist[i].package_code_android)
                        }else{
                            listPro.push(mlist[i].package_code_ios)
                        }
                    }
                }
                setPack_code_list(listPro)
                LogBase.log("=====listPro",listPro)
                IapBase.getProductList(listPro);
            // }
            setloading(false)
        }catch(error) {
            console.log("=====error",error)
            setloading(false)        }        
    }

    const convertData = (mList) => {
        var dataConvert = []
        mList.forEach(ele => {
            if(dataConvert.length == 0 || dataConvert.find(mc => mc.package_type_id == ele.package_type_id) == null){
                var newType = {
                    package_type_id: ele.package_type_id,
                    package_type_name: ele.package_type_name,
                    info: ele.info,
                    packList: []
                }
                dataConvert.push(newType)
            }
        });
        dataConvert.forEach(mono => {
            mono.packList = mList.filter(cm => cm.package_type_id == mono.package_type_id)
        });
        return dataConvert
    }

    const countPer = (oldPri,newPri) => {

        return Math.floor((1-(newPri/oldPri))*100)
    }

    const setupIAP = () => {

        purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                LogBase.log('purchase', purchase);
      
              const receipt = purchase?.transactionReceipt
                ? purchase?.transactionReceipt
                : purchase?.originalJson;
                LogBase.log("=====bill:",receipt);
              if (receipt) {
                  IapBase.billCode = receipt;
                  LogBase.log("=====mua thành công ",IapBase.billCode);
                  CallBuyKH(purchase);
              }
            },
          );
      
          purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
                LogBase.log('purchaseErrorListener', error);
              Alert.alert('purchase error', JSON.stringify(error));
            },
          );
    }

    const CallBuyKH = async (purchase) => {
        try {
            LogBase.log('===============Platform.OS',Platform.OS === 'ios')
            LogBase.log('===============Platform.OS_1',Platform.OS === 'ios' ? IapBase.billCode : JSON.parse(IapBase.billCode).purchaseToken)
            const url = API.baseurl_pay + API.checkBillCode;
            const qs = require('qs');
            // var mProduct = [{
            //     package_id: dataList[0].packList[curIndex].id,
            //     number: '1',
            //     price: dataList[0].packList[curIndex].cur_price
            // }]
            // var tranProduct = JSON.stringify(mProduct)
            LogBase.log('======url',url)
            LogBase.log('======curIndex',curIndex)
            LogBase.log('======dataList[curIndex]',dataList[curIndex])
            var mData = {
                id: dataList[curIndex].id,
                package_type: dataList[curIndex].package_type,
                package_code: pack_code_list[curIndex],
                // package_code: 'sunday.onemonth.v3',
                os: Platform.OS === 'ios' ? 'ios' : 'android',
                //  os: 'android',
                bill_code: Platform.OS == 'ios' ? IapBase.billCode : JSON.parse(IapBase.billCode).purchaseToken,
                //bill_code: billCodeTest1,
                // bill_code: billCodeAndTest,
                package_app: 'gk.app.sunday',
                // student_id: MyData.UserLogin.id,
                // order_detail: tranProduct,
                // username: MyData.UserLogin.username,
                // subscriptionId: naviData.package_code,
                // token: Platform.OS === 'ios' ? IapBase.billCode : JSON.parse(IapBase.billCode).purchaseToken,
                // bill_type: Platform.OS === 'ios'?'apple_store':'ch_play',
                // package_name: 'gk.app.sunday',
            }
    
            var tranData = qs.stringify(mData)
            //LogBase.log('===============mData',mData)
            //LogBase.log('===============IapBase.billCode',IapBase.billCode)
            // console.log('===============IapBase.billCode.purchaseToken',JSON.parse(IapBase.billCode).orderId)
            var res = await APIBase.callPaySV('post', url, tranData)
            LogBase.log('==========KQ thanh toán 1',res.data)
            //dữ liệu debug
            // if(LogBase.isDebug){
            //     Alert.alert("Dữ liệu gửi lên", tranData, [
            //         { text: 'Đóng', style: 'cancel' }
            //     ]);
            // }
            if(res.data.status){
                    const ackResult = await finishTransaction(purchase, true);
                    const cb = props.navigation.getParam('reload');
                    LogBase.log('==========reload 1')
                    if (cb) {
                        cb();
                        LogBase.log('==========reload 2')
                    }
                    props.navigation.navigate('UpgradeAccount')
                    LogBase.log('=====ackResult 1:', ackResult);
                    Alert.alert("Thông báo","Bạn đã mua thành công "+res.data.request.package_type, [
                        { text: 'Đóng', style: 'cancel' }
                    ]);
            }else{
                const ackResult = await finishTransaction(purchase, true);
                LogBase.log('=====ackResult 2:', ackResult);
                const cb = props.navigation.getParam('reload');
                if (cb) {
                    cb();
                }
                props.navigation.navigate('UpgradeAccount')
                Alert.alert("Thông báo",res.data.msg, [
                    { text: 'Đóng', style: 'cancel' }
                ]);
            }
        } catch (error) {
            LogBase.log("=====xác nhận đơn có lỗi: ",error)
        //    const ackResult = await finishTransaction(purchase, true);
            // LogBase.log('=====ackResult 3:', ackResult);
        }
    }

    const renderChoice = (item,index) => {
        var percenM = countPer(item.origin_price,item.cur_price)
        return(
            <TouchableOpacity onPress={()=>setCurIndex(index)} style={[styles.boxPriceSt,{backgroundColor: curIndex == index ? Colors._green02 : Colors.White}]}>
                <View style={[styles.radioLaySt,{backgroundColor: curIndex == index ? Colors.White : Colors.Gray_DE}]}>
                    {curIndex == index ? <Image source={radiobtn_on} style={styles.radio_onSt}/> : null}
                </View>
                <View style={styles.packNameLaySt}>
                    <Text style={styles.packNameTextSt}>{item.package_name}</Text>
                </View>
                <View  style={styles.priceLaySt}>
                    <View>
                        <Text style={styles.vndOldPriceSt}>{"đ"}</Text>
                        <Text style={styles.oldPriceSt}>{stringUtils.moneyForm(item.origin_price)}</Text>
                    </View>
                    <View>
                        <Text style={styles.vndPriceSt}>{"đ"}</Text>
                        <Text style={styles.newPriceSt}>{stringUtils.moneyForm(item.cur_price)}</Text>
                    </View>
                </View>
                {percenM > 1 &&
                    <View  style={styles.discoutSt}>
                        <Text  style={styles.discoutTextTopSt}>{"Giảm"}</Text>
                        <Text  style={styles.discoutTextBotSt}>{percenM+"%"}</Text>
                    </View>
                }                  
            </TouchableOpacity>
        );
    }

    const renderBox = ({ item, index }) => {
        return (
            <View style={styles.scrollLay}>
                <View style={styles.boxLaySt}>
                    <View style={styles.headerLay}> 
                        <Text style={styles.tittlePack}>{item.package_name}</Text>
                        <Text style={styles.desPack}>{"("+(item.short_detail || "Không giới hạn")+")"}</Text>
                    </View>
                    <View style={styles.bodyLaySt}>
                        {
                            stringUtils.toListDownLine(item?.info).map((item, index)=>{
                                var strList = item.split('-')
                                return(
                                    <View style={styles.lineLaySt}>
                                        <Image source={tick_tt} resizeMode={"contain"} style={[styles.ImageTickSty,{opacity: strList.length > 1 ? 0 : 1}]} />
                                        <Text style={styles.bodySty}>{item}</Text>
                                    </View>
                                        );
                                    })
                        }
                    </View>
                    {item.origin_price > item.cur_price && <View style={styles.priceRootLay}>
                        <Text style={styles.priceRootPack}>{stringUtils.moneyForm(item.origin_price)}</Text>
                        <Text style={styles.priceRootDongPack}>{"đ"}</Text>
                    </View>}
                    <View style={styles.priceRealLay}>
                        <Text style={styles.priceRealPack}>{stringUtils.moneyForm(item.cur_price)}</Text>
                        <Text style={styles.priceRealDongPack}>{"đ"}</Text>
                    </View>
                    <ShortMainButton text={"Mua ngay"} widthType={'full'} type={1}
                            onPress={() => {
                                setCurIndex(index)
                                IapBase.requestProduct(pack_code_list[index])
                                //CallBuyKH()
                            }}/>
                </View>
            </View>
        )
    }

    return (
        <ImageBackground
        source={{uri: 'background111'}}
        imageStyle={stylesApp.ImageBackground}
        style={{flex: 1}}>
            <AppHeader
                navigation={props.navigation}
                title={"Mua gói mới"}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
            />
        {
            loading ? null :
            <View style={styles.contain}>
                    {/* <ScrollView alwaysBounceVertical={false}> */}
                        {/* <View style={styles.imgLayoutSt}>
                            <Image style={styles.imageSty} source={avatargoi}/>
                        </View> */}
                        {/* <View style={styles.tittleLayoutSt}>
                            <Text style={styles.tittleSty}>{dataList[0]?.package_type_name}</Text>
                        </View> */}
                        {/* <View style={styles.bodyLaySt}>
                            {
                                stringUtils.toListDownLine(dataList[0]?.info).map((item, index)=>{
                                    return(
                                        <View style={styles.lineLaySt}>
                                            <Image source={tick_tt} resizeMode={"contain"} style={styles.ImageTickSty} />
                                            <Text style={styles.bodySty}>{item}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View> */}
                        {/* <View style={{height: SmartScreenBase.smPercenWidth*65}}></View> */}
                    {/* </ScrollView> */}
                {/* <View style={styles.priceBgSt}>
                    {
                        dataList[0].packList.map((item, index) => {
                            return(
                                <View>
                                    {renderChoice(item,index)}
                                </View>
                            );
                        })
                    }
                    <View style={{height: SmartScreenBase.smPercenWidth}}></View>
                    <ShortMainButton
                        type={1}
                        text={"Mua ngay"} widthType={'full'}
                        onPress={() => 
                            IapBase.requestProduct(pack_code_list[curIndex])
                            //CallBuyKH()
                        }
                    />            
                </View> */}
                <FlatList
                    data={dataList}
                    renderItem={renderBox}
                    keyExtractor={(item, index) => item.id}
                    />
                </View>
        }
        </ImageBackground>
    );
};

export default BuyPackage;