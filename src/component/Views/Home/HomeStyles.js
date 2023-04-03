import homepage from "../../../assets/images/home_page/homepage.png";

export const  HomeStyles = {
    customContainer:{
        backgroundImage: `url(${homepage})`,
        height: "auto",
        paddingBottom:"1.5rem"
    },
    homeContainer:{
        padding:"2rem",
       paddingLeft:"5rem"
    },
    cardContainer:{
        background: "#ffffff63" ,
        width:"100%",
        borderRadius:"0.625rem",
        color:'#000',
        padding:"0.8rem",
    },
    cardMainContainer:{
        background: "#f295284d" ,
        width:"100%",
        borderRadius:"0.625rem",
        color:'#000',
        padding:"1rem",
    },
    projectContainer:{
        height:"25rem",
        background:"#fff",
        margin:"2rem",
        borderRadius:"1rem"
    }  ,
    icon:{
        color:"#FF8832"
    }  ,
    cardContent:{
        justifyContent:"space-between",
        mb:1,
        mt:2
    },
    cardhead :{
        justifyContent:"space-between",
        borderBottom:1,
        mb:1
    },
    bar: {
        float: "left",
        height: "10px",
        "&:first-of-type": {
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
        },
        "&:last-of-type": {
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
        },
    },


}