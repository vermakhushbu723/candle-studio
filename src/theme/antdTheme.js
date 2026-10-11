// Ant Design tokens mapped to the Jyotessa palette
export const colors = {
  cream: '#FFF9F5',
  shell: '#F6EDE4',
  linen: '#EADBC8',
  sand: '#F7E4D8',
  charcoal: '#3A1507',
  ash: '#7A5A4C',
  gold: '#C98A4B',
  cocoa: '#8A3A16',
  terracotta: '#6C2408',
  caramel: '#E3A77C',
  rose: '#C47A5A',
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
    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 28,
  },
  components: {
    Button: { primaryShadow: 'none', fontWeight: 600 },
    Rate: { starColor: colors.gold },
    Collapse: { headerBg: 'transparent' },
    Form: { itemMarginBottom: 16, verticalLabelPadding: '0 0 4px' },
    Segmented: { itemSelectedBg: colors.terracotta, itemSelectedColor: '#fff', trackBg: colors.shell },
    Tabs: { itemSelectedColor: colors.terracotta, inkBarColor: colors.terracotta },
  },
}
