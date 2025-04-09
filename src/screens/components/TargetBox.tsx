import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles';
import useTargets from '../Hooks/useTargets';

const TargetBox: React.FC = () => {
  const { stepTarget, calorieTarget } = useTargets();

  return (
    <View style={styles.targetview}>
      <LinearGradient colors={['#8a2be2', '#4b0082']} style={styles.targetbox}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, color: 'white' }}>My Target</Text>
          <Image source={require('../../../assets/icons/steps.png')} style={styles.icon} />
        </View>

        <View style={styles.row}>
          <LinearGradient colors={['#8a2be2', '#4b0082']} style={styles.circleGradient}>
            <View style={styles.circle}>
              <Text style={styles.circleNumber}>{stepTarget}</Text>
              <Text style={styles.circleText}>Steps</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#8a2be2', '#4b0082']} style={styles.circleGradient}>
            <View style={styles.circle}>
              <Text style={styles.circleNumber}>{calorieTarget}</Text>
              <Text style={styles.circleText}>KCal</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TargetBox;
