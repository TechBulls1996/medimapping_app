import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { Colors } from '@/constants/Colors';
//import { useColorScheme } from '@/hooks/useColorScheme';
import { Badge, Drawer, Avatar, Menu, MenuProps } from 'antd';
import { AlignLeftOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigation } from '@react-navigation/native';

type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [current, setCurrent] = useState('profile');
  const navigation = useNavigation();

  const toggleMenu = () => setMenuVisible(!menuVisible);
  //const colorScheme = useColorScheme();
  const menuStyle = { fontSize: '17px', radius: '0px' }
  const items: MenuItem[] = [
    {
      label: 'My Profile',
      key: 'profile',
      icon: <SettingOutlined style={menuStyle} />,
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LoginOutlined style={menuStyle} />,
    }
  ];

  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MyApp</Text>
      </View>

      {/* User Icon and Dropdown */}
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('auth')} style={styles.userIconContainer}>
          {/* <Avatar style={{ backgroundColor: Colors[colorScheme ?? 'light'].tint }} icon={<UserOutlined />} /> */}
          <Badge dot>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIconContainer}>
          <AlignLeftOutlined style={{ fontSize: 34 }} />
        </TouchableOpacity>


        {/* Dropdown Menu */}
        {menuVisible && (
          <Drawer title="" onClose={toggleMenu} open={menuVisible} width="300">
            <Menu
              onClick={onClickMenuItem}
              style={{ width: '100%', fontSize: '16px' }}
              mode="vertical"
              items={items}
            />
          </Drawer>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // user
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIconContainer: {
    marginLeft: 10,
    fontSize: 34,
  },

  // menu
  menuIconContainer: {
    marginLeft: 10,
  },

});

export default Header;
