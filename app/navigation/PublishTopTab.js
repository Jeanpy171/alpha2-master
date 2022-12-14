import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Publish from '../screens/Publish';
import StockPile from '../screens/StockPile';

const Tab = createMaterialTopTabNavigator();

export  const  PublishTopTabs = () => {
        return (
          <Tab.Navigator>
            <Tab.Screen name="StockPile" component={StockPile} />
            <Tab.Screen name="Publish" component={Publish} />
          </Tab.Navigator>
        );
      }

