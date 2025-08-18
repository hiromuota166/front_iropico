import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackgroundBlue from './BackgroundBlue';
import LobbyUserIcon from './Icon/LobbyUserIcon';
import YouBadge from './YouBadge';

type UserListProps = {
  userName: string;
  youBadge?: boolean;
};

export const UserList: React.FC<UserListProps> = ({ userName, youBadge = false }) => (
  <BackgroundBlue style={styles.container}>
    <LobbyUserIcon />
    <View style={styles.textContainer}>
      <Text>{userName}</Text>
    </View>
    {youBadge && <YouBadge />}
  </BackgroundBlue>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
});
