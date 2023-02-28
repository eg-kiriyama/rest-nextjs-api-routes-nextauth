import { FC, ReactNode } from 'react';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto pt-4">{props.children}</div>
    </div>
  );
};

export default Layout;
