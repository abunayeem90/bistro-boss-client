import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import menuImg from '../../../../assets/menu/banner3.jpg';
import dessertImg from '../../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../../assets/menu/pizza-bg.jpg';
import saladsImg from '../../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../../assets/menu/soup-bg.jpg';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import useMenu from '../../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();
    const salads = menu.filter(item => item.category == 'salad')
    const dessert = menu.filter(item => item.category == 'dessert')
    const pizza = menu.filter(item => item.category == 'pizza')
    const soup = menu.filter(item => item.category == 'soup')
    const offered = menu.filter(item => item.category == 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss ||Menu</title>
            </Helmet>
            <Cover bgimg={menuImg} title={'Our Menu'}></Cover>
            {/* Main Cover */}
            <SectionTitle
            heading={`TODAY'S OFFER`}
            subHeading={`Don't miss`}></SectionTitle>
            {/* offered menu items */}
            <MenuCategory item={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory item={dessert}
            title='dessert'
            coverImg={dessertImg}
            ></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory item={pizza}
            title='pizza'
            coverImg={pizzaImg}></MenuCategory>
            {/* salads menu items */}
            <MenuCategory item={salads}
            title='salad'
            coverImg={saladsImg}></MenuCategory>
            {/* soup menu items */}
            <MenuCategory item={soup}
            title='soup'
            coverImg={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;