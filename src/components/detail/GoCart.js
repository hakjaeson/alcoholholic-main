import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { postAddCart } from "../../api/productApi";
import { BigButton, PlaceBt } from "../../styles/common/reviewProductCss";
import { Common } from "../../styles/CommonCss";
import CartModal from "../modal/CartModal";
import MapModal from "../modal/MapModal";

export const GoMapModal = () => {
  const [isMapModalOpen, setMapModalOpen] = useState(false);
  const { code } = useParams();

  const handleOpenMapModal = () => {
    setMapModalOpen(true);
  };

  const handleCloseMapModal = () => {
    setMapModalOpen(false);
  };

  return (
    <div>
      {isMapModalOpen && <MapModal onClose={handleCloseMapModal} code={code} />}
      <PlaceBt onClick={handleOpenMapModal}> 판매처 선택</PlaceBt>
    </div>
  );
};

//
export const GoCartModal = ({ postcard }) => {
  const navigate = useNavigate();
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  // 장바구니 넣기
  const addCartMutation = useMutation({
    mutationFn: () => postAddCart({ postcard }),
    onSuccess: () => {
      setCartModalOpen(true);
    },
  });
  const handleOpenCartModal = () => {
    // console.log("ok", postcard);
    addCartMutation.mutate(postcard);
  };

  const handleCloseCartModal = () => {
    setCartModalOpen(false);
    navigate("/cart?basket=pickup");
  };

  return (
    <div>
      {isCartModalOpen && <CartModal onClose={handleCloseCartModal} />}
      <BigButton
        onClick={handleOpenCartModal}
        style={{
          width: "500px",
          background: `${Common.color.p000}`,
          border: `1px solid ${Common.color.p300}`,
        }}
      >
        장바구니 담기
      </BigButton>
    </div>
  );
};
