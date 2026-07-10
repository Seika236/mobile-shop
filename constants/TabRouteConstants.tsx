import { TabRouteType } from "@/types/TabRouteType";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export const TabRoutesConstants: TabRouteType[] = [
  {
    name: "index",
    title: "Index",
    icon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
  },
  {
    name: "favorite",
    title: "Favorite",
    icon: ({ color }) => <Ionicons size={28} name="heart" color={color} />,
  },
  {
    name: "search",
    title: "Search",
    icon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
  },
  {
    name: "cart",
    title: "Cart",
    icon: ({ color }) => <Ionicons size={28} name="cart" color={color} />,
  },
  {
    name: "profile",
    title: "Profile",
    icon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
  },
];
