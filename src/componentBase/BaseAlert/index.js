import Manager from './Manager';
import { AstraAlertOptions, ShowModalOptions, ShowAlertByTypeParams, ShowAlertByTypeDefaltParams } from './BaseAlert';

export const ALERT_TYPE = {
    DEFAULT: 'DEFAULT',
    ACCOUNT_EXISTS: 'ACCOUNT_EXISTS',
    CONTACT_MANAGER: 'CONTACT_MANAGER',
    BASE_ALERT: 'BASE_ALERT',
    DEPLOY_FUNCTION: 'DEPLOY_FUNCTION',
};

export function showAlert (title?: string,message?: string, button: {text: string, onPress: () => void}, options?: ShowModalOptions) {
    const ref = Manager.getDefault();
    if (ref) {
        ref.showModal(title, message,button, options);
    }
}

export function showAlertByType (params: ShowAlertByTypeParams) {

    const ref = Manager.getDefault();

    if (ref) {
        ref.onShowByType(params);
    }
}


export function hideAlert () {
    const ref = Manager.getDefault();

    if (ref) {
        ref.onClose();
    }
}
