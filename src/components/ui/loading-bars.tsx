import { Bars } from "react-loader-spinner";

interface LoadingBarsProps {
  color?: string;
  className?: string;
}

export const LoadingBars: React.FC<LoadingBarsProps> = ({
  color,
  className,
}) => {
  return (
    <Bars
      height="25"
      width="25"
      color={color ?? "#fff"}
      ariaLabel="loading content"
      wrapperStyle={{}}
      wrapperClass={className ?? ""}
      visible={true}
    />
  );
};
