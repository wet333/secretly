import React from "react";
import Button from "../../ui/Button.tsx";
import {Plus} from "lucide-react";
import {Link} from "react-router-dom";

const AddSecretButton : React.FC = () => {
    return (
        <Button
            variant={"primary"}
            icon={<Plus size={18}/>}
            iconPosition={"left"}
        >
            <Link to={"/addSecret"}>Add Secret</Link>
        </Button>
    );
};

export default AddSecretButton;