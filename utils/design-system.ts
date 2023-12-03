import { Spacings, ThemeManager, Typography, Colors, BorderRadiuses } from 'react-native-ui-lib'

export class DesignSystem {
  static setup() {
    Colors.loadDesignTokens({
      primaryColor: '#FDA84B',
    })

    Colors.loadColors({
      secondaryColor: '#2C2C2C',
      lightGray: '#DCDCDC'
    })

    Typography.loadTypographies({
      h1: { fontSize: 32, fontFamily: 'NotoSansThai' },
      h2: { fontSize: 26, fontFamily: 'NotoSansThai' },
      h3: { fontSize: 24, fontFamily: 'NotoSansThai' },
      h4: { fontSize: 20, fontFamily: 'NotoSansThai' },
      h5: { fontSize: 18, fontFamily: 'NotoSansThai' },
      h1B: { fontSize: 32, fontFamily: 'NotoSansThaiBold' },
      h2B: { fontSize: 26, fontFamily: 'NotoSansThaiBold' },
      h3B: { fontSize: 24, fontFamily: 'NotoSansThaiBold' },
      h4B: { fontSize: 20, fontFamily: 'NotoSansThaiBold' },
      h5B: { fontSize: 18, fontFamily: 'NotoSansThaiBold' },
      body: { fontSize: 16, fontFamily: 'NotoSansThai' },
      bodyB: { fontSize: 16, fontFamily: 'NotoSansThaiBold' },
      caption: { fontSize: 14, fontFamily: 'NotoSansThai' }
    })

    Spacings.loadSpacings({ page: 16 })

    ThemeManager.setComponentTheme('Text', (props) => {
      const defaultProps = {
        body: true,
        color: Colors.black,
      };

      if (props.red) {
        defaultProps.color = Colors.red30;
      }
    
      return defaultProps;
    });
    ThemeManager.setComponentTheme('Button', (props) => {
      const defaultProps = {
        backgroundColor: Colors.primaryColor,
        bodyB:true,
        width:'100%',
      };
    
      if (props.secondary) {
        defaultProps.backgroundColor = Colors.secondaryColor;
      }

      return defaultProps;
    });

    ThemeManager.setComponentTheme('TextField', () => ({
      borderColor: Colors.primaryColor,
      body:true,
    }))
  }
}