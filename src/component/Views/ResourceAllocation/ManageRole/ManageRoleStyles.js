import homepage from "../../../../assets/images/home_page/homepage.png";

export const ManageRoleStyles = {

    mainBox: {
        backgroundImage: `url(${homepage})`,
        height: "91vh",
        paddingBottom: "1.5rem",
        overflow: 'hidden'
    },
    MngButton: {
        backgroundColor: "#cec8c8",
        color: '#fff',
        boxShadow: "none",
        fontSize: 14,
        borderRadius: '10px',
        border: 1,
        fontWeight: 900,
        textAlign: "center",
        float: 'right',
        mr: 1,
        height: "50px",
        width: "200px",
        textTransform: "capitalize",

    },

    TableMain: {
        height: 'auto',
        borderRadius: '0.5rem',

        width: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            width: '0em', height: '0'
        }
    },
    manageUserBox: {
        display: "flex",
        justifyContent: "space-between",
        background: "#148AE1",
        padding: "1rem",
        borderRadius: "1rem 1rem 0 0",
        color: "#fff"
    },
    manageuserTop: {
        m: 4,
        boxShadow: "5",
        borderRadius: "1rem ",

    },
    addRoleHeading: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },


    /// Add Role ///





    /// DeleteRole Role  ///

    deleteMain: {
        mt: 8,

    },
    delAddBtn: {
        display: 'flex',
        justifyContent: 'center',
        mt: 2
    }



}


