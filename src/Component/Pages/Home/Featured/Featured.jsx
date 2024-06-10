import SectionTitle from "../../../SectionTitle/SectionTitle";
import featured from '../../../../assets/home/featured.jpg';
import './featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-10 text-white bg-black bg-opacity-50">
            <SectionTitle 
                heading={'Featured Item'}
                subHeading={'Check it out'}></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 py-20 px-36 ">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">WHERE CAN I GET SOME? </p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quia numquam vero minima ut consectetur rem fugiat soluta. Quaerat ad minima, sint vel maxime voluptatem magnam eum placeat obcaecati? Eos!</p>
                    <button className="btn btn-outline border-0 border-b-4">Read More</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;