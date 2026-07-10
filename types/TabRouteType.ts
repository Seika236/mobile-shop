import { JSX } from "react";

type RouteNames =
  | "index"
  | "explore"
  | "favorite"
  | "profile"
  | "search"
  | "cart";
type RouteTitles = Capitalize<RouteNames>;
type TabBarIconType = ({ color }: { color: any }) => JSX.Element;

export type TabRouteType = {
  name: RouteNames;
  title: RouteTitles;
  icon?: TabBarIconType;
};
