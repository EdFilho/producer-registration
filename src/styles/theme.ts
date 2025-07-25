export const theme = {
  colors: {
    // Cores primárias do agronegócio
    primary: {
      main: '#2E7D32', // Verde escuro agro
      light: '#4CAF50', // Verde médio
      lighter: '#66BB6A', // Verde claro
      dark: '#1B5E20', // Verde muito escuro
    },
    secondary: {
      main: '#1976D2', // Azul primary
      light: '#42A5F5', // Azul claro
      lighter: '#64B5F6', // Azul mais claro
      dark: '#0D47A1', // Azul escuro
    },
    danger: {
      main: '#D32F2F', // Vermelho
      light: '#F44336', // Vermelho claro
      lighter: '#EF5350', // Vermelho mais claro
      dark: '#B71C1C', // Vermelho escuro
    },
    warning: {
      main: '#F57C00', // Laranja
      light: '#FF9800', // Laranja claro
      lighter: '#FFB74D', // Laranja mais claro
      dark: '#E65100', // Laranja escuro
    },
    success: {
      main: '#388E3C', // Verde sucesso
      light: '#4CAF50', // Verde sucesso claro
      lighter: '#66BB6A', // Verde sucesso mais claro
      dark: '#2E7D32', // Verde sucesso escuro
    },
    info: {
      main: '#0288D1', // Azul info
      light: '#03A9F4', // Azul info claro
      lighter: '#29B6F6', // Azul info mais claro
      dark: '#01579B', // Azul info escuro
    },
    // Cores neutras
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
    },
    background: {
      default: '#F1F8E9', // Verde muito claro para fundo
      paper: '#FFFFFF',
      card: '#FFFFFF',
    },
    border: {
      main: '#E0E0E0',
      light: '#F5F5F5',
      dark: '#BDBDBD',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)',
  },
  fonts: {
    primary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    monospace:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
};

export type Theme = typeof theme;
