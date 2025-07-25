import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      danger: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      warning: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      success: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      info: {
        main: string;
        light: string;
        lighter: string;
        dark: string;
      };
      neutral: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      background: {
        default: string;
        paper: string;
        light: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      border: {
        light: string;
        medium: string;
        dark: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    typography: {
      fontFamily: string;
      h1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
      h3: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
      body1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
      body2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
      caption: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
      };
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
