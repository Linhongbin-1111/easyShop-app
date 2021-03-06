import Vue from 'vue'
import {
  Button,
  NavBar,
  Dialog,
  Toast,
  Row,
  Col,
  Cell,
  CellGroup,
  Icon,
  Field,
  Loading,
  Form,
  Tabbar,
  Tab,
  Tabs,
  List,
  TabbarItem,
  PullRefresh,
  Popup
} from 'vant';

var components = [
  Button,
  NavBar,
  Dialog,
  Toast,
  Popup,
  Row,
  Col,
  Cell,
  CellGroup,
  Icon,
  Field,
  Loading,
  Form,
  Tabbar,
  Tab,
  Tabs,
  List,
  TabbarItem,
  PullRefresh
];
components.forEach(component=>{
  Vue.use(component)
})
