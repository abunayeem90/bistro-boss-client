import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import orderCover from '../../../../assets/shop/order.jpg';
import Cover from '../../../Shared/Cover/Cover';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';



const Order = () => {
    
    const categories = ['salad', 'pizza','soup', 'dessert',  'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const  [menu] = useMenu();
    const salads = menu.filter(item => item.category == 'salad')
    const dessert = menu.filter(item => item.category == 'dessert')
    const pizza = menu.filter(item => item.category == 'pizza')
    const soup = menu.filter(item => item.category == 'soup')
    const drinks = menu.filter(item => item.category == 'drinks')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Order Food</title>
            </Helmet>
            <Cover bgimg={orderCover} title={'Order Now'} > </Cover>
            <div className='my-6 mx-auto text-center '>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {
                            categories.map(item => <Tab key={item}><Link className='uppercase' to={`/order/${item}`}>{item}</Link></Tab>)
                        }
                        {/* <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUPS</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab> */}
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salads}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default Order;