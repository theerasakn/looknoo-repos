/**
 * SOSModal — Emergency modal showing nearest vet with navigate + call.
 */

import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { Theme } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { RADIUS, SHADOW } from '../../theme/spacing';
import { Place } from '../../types/place';
import { openGoogleMaps } from '../../utils/openMaps';
import { Btn } from '../ui/Btn';
import { Icon } from '../ui/Icon';

interface SOSModalProps {
  visible: boolean;
  nearestVet: Place | undefined;
  onClose: () => void;
  C: Theme;
}

/** SOS emergency modal — shows nearest vet with nav + call actions. */
export const SOSModal: React.FC<SOSModalProps> = ({
  visible,
  nearestVet,
  onClose,
  C,
}) => {
  const handleNavigate = () => {
    if (nearestVet) {
      openGoogleMaps(nearestVet.label);
    }
  };

  const handleCall = () => {
    if (nearestVet?.phone) {
      Linking.openURL(`tel:${nearestVet.phone}`);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            SHADOW.modal,
            { backgroundColor: C.bgCard },
          ]}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Icon name="close" size={24} color={C.textSecondary} />
          </TouchableOpacity>

          <View
            style={[styles.iconCircle, { backgroundColor: C.redLight }]}
          >
            <Icon name="sos" size={32} color={C.red} />
          </View>

          <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary }]}>
            {'\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19!'}
          </Text>

          {nearestVet ? (
            <>
              <Text
                style={[
                  TYPOGRAPHY.body,
                  styles.vetName,
                  { color: C.textPrimary },
                ]}
              >
                {nearestVet.label}
              </Text>
              <Text
                style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}
              >
                {nearestVet.dist}
              </Text>

              <View style={styles.actions}>
                <Btn
                  variant="sos"
                  icon="navigate"
                  onPress={handleNavigate}
                  C={C}
                >
                  {'\u0E19\u0E33\u0E17\u0E32\u0E07'}
                </Btn>
                {nearestVet.phone && (
                  <Btn
                    variant="outline"
                    icon="phone"
                    onPress={handleCall}
                    C={C}
                  >
                    {'\u0E42\u0E17\u0E23'}
                  </Btn>
                )}
              </View>
            </>
          ) : (
            <Text
              style={[TYPOGRAPHY.body, { color: C.textSecondary }]}
            >
              {'\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07'}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    borderRadius: RADIUS.card,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vetName: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
});
