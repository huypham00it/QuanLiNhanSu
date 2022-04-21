import React from 'react';
import { Card, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

function RenderStaff({staff}){
    return(
        <FadeTransform 
            in
            transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)"
            }}
        >
            <Card>
                    <Link className="text-decoration-none" to={`/staffs/${staff.id}`}>
                        <CardImg src={staff.image} alt={staff.name} />
                        <h4 className="text-center text-dark line-height-1">{staff.name}</h4>
                    </Link>
            </Card>
        </FadeTransform>
    )
}   

const Staff = ({staffs}) => {
    if (staffs.length > 0){
        const menu = staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-4 col-lg-2 p-1 my-2">
                        <RenderStaff staff={staff} />
                </div>
            );
        });

        return (
                <div className="row">
                    {menu}
                </div>
        )
    }else {
        return (
            <p>Nhân viên không tồn tại</p>
        )
    }

}

export default Staff;