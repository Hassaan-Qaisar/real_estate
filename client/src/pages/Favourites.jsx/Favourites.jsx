import React, { useContext, useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useProperties } from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../../utils/api";

export const Favourites = () => {
  const { user } = useAuth0();
  const [filter, setFilter] = useState("");
  const [favourites, setFavourites] = useState([])
  const { data, isError, isLoading } = useProperties();  

  useEffect(() => {
    if (user) {
      getAllFav(user.email).then((favouritesData) => {
        setFavourites(favouritesData)
      }).catch((error) => {
        console.log("Error while getting data from backend")
      })
    }
  }, [user])

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  //console.log(data)

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            // data.map((card, i) => (
            //   <PropertyCard card={card} key={i} />
            // ))

            data
              .filter((property) => favourites.includes(property.id))

              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))

            //   favourites.map((card, i) => (
            //     <PropertyCard card={card} key={i} /> ))
          }

        </div>
      </div>
    </div>
  );
};

