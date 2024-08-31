import { Metadata, NextPage } from "next";
import { AppProps } from "next/app";
import { MemoExoticComponent, ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (
    page: ReactElement
  ) => ReactNode | MemoExoticComponent<React.ComponentType>;
  metadata: Metadata;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export type MetaProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

export type LayoutPage = string | JSX.Element | JSX.Element[];

export interface LayoutProps {
  children: LayoutPage;
  className?: string;
  id?: string;
}
