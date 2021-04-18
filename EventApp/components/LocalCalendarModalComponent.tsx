import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import LocalCalendarService from '../services/localCalendar';

LocalCalendarModalComponent.propTypes = {
  isVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  handleCalendarSelected: PropTypes.func,
  label: PropTypes.string,
  modalTestID: PropTypes.string,
};

LocalCalendarModalComponent.defaultProps = {
  isVisible: false,
  closeModal: () => {},
  handleCalendarSelected: () => {},
  label: 'Select a calendar',
  modalTestID: 'localCalendarModal',
};

function LocalCalendarModalComponent(props) {
  const [calendars, setCalendars] = useState([]);
  let localCalendarService = new LocalCalendarService();
  useEffect(() => {
    const loadCalendars = async () => {
      const calendarsTmp = await localCalendarService.listEvents();
      setCalendars(calendarsTmp);
    };
    if (props.isVisible) {
      loadCalendars();
    }
  }, [props.isVisible]);

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.closeModal}
      animationType="slide">
      <TouchableWithoutFeedback
        accessible={false}
        onPress={props.closeModal}
        style={styles.container}>
        <View style={styles.backdrop}>
          <View style={styles.agendaModalBody}>
            <Text>{props.label}:</Text>
            <View style={styles.agendaList}>
              <ScrollView>
                {calendars.map((calendar, i) =>
                  calendar.allowsModifications ? (
                    <TouchableOpacity
                      key={i}
                      onPress={() => props.handleCalendarSelected(calendar)}
                      style={[
                        styles.calendarOption,
                        {backgroundColor: calendar.color},
                      ]}>
                      <Text key={i}>
                        {calendar.title}
                      </Text>
                    </TouchableOpacity>
                  ) : null,
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  agendaModalBody: {
    flexShrink: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  agendaList: {
    marginTop: 10,
  },
  calendarOption: {
    padding: 10,
  },
});

export default LocalCalendarModalComponent;