// Ant Design tokens mapped to the candledust palette
export const colors = {
  cream: '#FFF9F5',
  shell: '#F6EDE4',
  linen: '#EADBC8',
  sand: '#FDE8EB',
  charcoal: '#2B2B2B',
  ash: '#6B6B6B',
  gold: '#C9A227',
  cocoa: '#8B5E3C',
  terracotta: '#B76E4A',
  caramel: '#D4A373',
  rose: '#D98CA3',
}

export const antdTheme = {
  token: {
    colorPrimary: colors.terracotta,
    colorLink: colors.terracotta,
    colorText: colors.charcoal,
    colorTextSecondary: colors.ash,
    colorBorder: colors.linen,
    colorBgLayout: colors.cream,
    colorWarning: colors.gold,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    borderRadius: 12,
    controlHeight: 42,
  },
  components: {
    Button: { primaryShadow: 'none', fontWeight: 600 },
    Rate: { starColor: colors.gold },
    Collapse: { headerBg: 'transparent' },
    Segmented: { itemSelectedBg: colors.terracotta, itemSelectedColor: '#fff', trackBg: colors.shell },
    Tabs: { itemSelectedColor: colors.terracotta, inkBarColor: colors.terracotta },
  },
}
