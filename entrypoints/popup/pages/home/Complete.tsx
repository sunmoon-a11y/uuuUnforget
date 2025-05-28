import { SVGProps } from "react";

export const Complete = ({ width = 20, stroke = 'green', ...props }: SVGProps<any>) => {
  return <svg xmlns="http://www.w3.org/2000/svg" {...props} width={width} height={width} viewBox="0 0 24 24" fill="none" stroke={stroke}
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
}
