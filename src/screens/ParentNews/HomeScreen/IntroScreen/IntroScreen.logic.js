import {
  intro_parent_1,
  intro_parent_2,
  intro_parent_3,
  intro_parent_4,
} from '../../../../assets/image';
import {useState, useRef} from 'react';

export const introScreenLogic = props => {
  const [keyItem, setKeyItem] = useState(0);

  const refCarow = useRef();

  const dataIntroCarousel = [
    {
      id: 1,
      imgSrc: intro_parent_1,
      title: 'DỄ DÀNG QUẢN LÝ',
      subTitle: null,
      detail:
        'Sunday Parent giúp ba mẹ theo dõi và quản lý sát sao việc học, điểm số, thành tích của con. ',
    },
    {
      id: 2,
      imgSrc: intro_parent_2,
      title: 'KÈM CẶP, GIAO BÀI CHO CON',
      subTitle: null,
      detail:
        'Với vai trò là một gia sư ảo, Sunday Parent hỗ trợ ba mẹ giao bài cho con nhờ tính năng đề xuất giao bài theo năng lực.',
    },
    {
      id: 3,
      imgSrc: intro_parent_3,
      title: 'CHƯƠNG TRÌNH GIÁM SÁT SGK',
      subTitle: null,
      detail:
        'Hàng ngàn bài tập kèm lời giải chi tiết được phân loại theo học lực của con giúp phát triển toàn diện 4 kỹ năng Nghe – Nói - Đọc - Viết.',
    },
    {
      id: 4,
      imgSrc: intro_parent_4,
      title: null,
      subTitle: 'Liên kết với con để trải nghiệm các tính năng của app.',
      detail: null,
    },
  ];

  const _pressCarou = index => {
    setKeyItem(index);
    refCarow.current.snapToItem(index);
  };

  const handlePressChangeItem = type => {
    switch (type) {
      case 'prev':
        if (keyItem - 1 >= 0) {
          setKeyItem(keyItem - 1);

          refCarow.current.snapToItem(keyItem - 1);
        }
        return;
      case 'next':
        if (keyItem + 1 <= dataIntroCarousel.length - 1) {
          setKeyItem(keyItem + 1);
          refCarow.current.snapToItem(keyItem + 1);
        } else {
          props.navigation.navigate('ParentApp');
        }
        return;
      default:
    }
  };

  return {
    dataIntroCarousel,
    keyItem,
    setKeyItem,
    refCarow,
    _pressCarou,
    handlePressChangeItem,
  };
};
