import { Container, Modal, Step, Stepper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AddLocation } from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import {Facilities} from "../Facilities/Facilities";

export const AddPropertyModel = ({ opened, setOpened }) => {
    const [active, setActive] = useState(0)
    const {user} = useAuth0();
    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: "",
      });

      useEffect(() => {
        if (user?.email) {
          setPropertyDetails((prev) => ({
            ...prev,
            userEmail: user.email,
          }));
        }
      }, [user?.email]);

      const nextStep = () => {
        setActive((current) => (current < 4 ? current + 1 : current));
        
      };
    
      const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
      };

      //console.log(propertyDetails.facilitie.bedrooms)
      // console.log(propertyDetails.userEmail)

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>

        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false} >
          <Stepper.Step label="Location" description="Address">
            <AddLocation 
            nextStep = {nextStep}
            propertyDetails = {propertyDetails}
            setPropertyDetails = {setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Images" description="Upload">
            <UploadImage
            prevStep = {prevStep}
            nextStep = {nextStep}
            propertyDetails = {propertyDetails}
            setPropertyDetails = {setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
          <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          
          <Stepper.Step label="More Details" description="Further Info">
          <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

      </Container>
    </Modal>
  );
};
