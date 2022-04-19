import React from 'react';
import { Card, CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Fade, Stagger } from 'react-animation-components';

function RenderStaff({staff}){
    return(
        <Fade in>
            <Card>
                    <Link className="text-decoration-none" to={`/staffs/${staff.id}`}>
                        <CardImg src={staff.image} alt={staff.name} />
                        <h4 className="text-center text-dark line-height-1">{staff.name}</h4>
                    </Link>
            </Card>
        </Fade>
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
                <Stagger in>
                    <div className="row">
                        {menu}
                    </div>
                </Stagger>
        )
    }else {
        return (
            <p>Nhân viên không tồn tại</p>
        )
    }

}

export default Staff;