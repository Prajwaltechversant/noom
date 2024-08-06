import {View, Text} from 'react-native';
import React from 'react';
import textStyle from '../../style/text/style';

const PrivacyPolicy: React.FC = () => {
  return (
    <View>
      <Text style={textStyle.labelText}>
        By Proceeding, you concent to our Terms of use,{`\n`}
        Support, Privacy Policy and Research Policy
      </Text>
    </View>
  );
};

export default PrivacyPolicy;
