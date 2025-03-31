export type SidebarItem = {
  header?: boolean
  item: string
  childs: { item: string; childs: SidebarItem[] }[]
}
