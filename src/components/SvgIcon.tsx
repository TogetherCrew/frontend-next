/* eslint-disable react/require-default-props */
import { useDynamicSvgImport } from '../utils/useDynamicSvgImport.ts';

interface IProps {
  iconName: string;
  wrapperStyle?: React.CSSProperties;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

function SvgIcon(props: IProps) {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, SvgIcon: DynamicSvgIcon } = useDynamicSvgImport(iconName);

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
        <div style={wrapperStyle}>
          <DynamicSvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
}

export default SvgIcon;
