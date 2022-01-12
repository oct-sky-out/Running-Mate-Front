import React from 'react';
import { IconType } from 'react-icons/lib';

interface IProps {
  widgetTitle: string;
  widgetDescription: string;
  Icon?: IconType;
  iconColor?: string;
  Image?: React.FC<any>;
}

const CrewWidget: React.FC<IProps> = ({
  widgetTitle,
  widgetDescription,
  Icon,
  iconColor,
  Image,
}) => {
  return (
    <div className="w-64 h-32 border-2 mx-5 rounded-2xl border-purple">
      <div className="w-48 mt-8 mx-auto my-0">
        <div className="float-left mr-3">
          {Image && <Image clasName="w-12 h-12" />}
          {Icon && <Icon color={iconColor} size="48" />}
        </div>
        <span className="block mb-2">{widgetTitle}</span>
        <span className="block">{widgetDescription}</span>
      </div>
    </div>
  );
};

export default CrewWidget;
