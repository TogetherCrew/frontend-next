/* eslint-disable react/require-default-props */
import { useDynamicSvgImport } from '../utils/useDynamicSvgImport';

interface IProps {
  iconName: string;
  wrapperStyle?: React.CSSProperties;
  svgProp?: React.SVGProps<SVGSVGElement>;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function SvgIcon(props: IProps) {
  const { iconName, wrapperStyle, svgProp, onClick } = props;
  const { loading, SvgIcon: DynamicSvgIcon } = useDynamicSvgImport(iconName);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            height: '8px',
            width: '8px',
          }}
        />
      )}
      {DynamicSvgIcon && (
        <div
          style={wrapperStyle}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
        >
          <DynamicSvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
}

export default SvgIcon;
