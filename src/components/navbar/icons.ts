import {
  HomeIcon,
  SearchIcon,
  NotebookTextIcon,
  Bookmark,
  User,
  SettingsIcon,
} from "lucide-react";

type IconComponentType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
    React.RefAttributes<SVGSVGElement>
>;

const icons: { [key: string]: IconComponentType } = {
  home: HomeIcon,
  search: SearchIcon,
  blogs: NotebookTextIcon,
  savedItems: Bookmark,
  profile: User,
  settings: SettingsIcon,
};

export default icons;