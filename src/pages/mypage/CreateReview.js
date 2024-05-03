import { ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
import { reviewData } from "../../mock/CrtRvwData";
import { Common } from "../../styles/CommonCss";
import { TableCustom } from "../../styles/common/tableCss";
import RvModal from "../../components/mypage/RvModal";
import { BasicBtR } from "../../styles/basic/basicBt";
import { getReviewcheck, postReviewcheck } from "../../api/reviewApi";

// const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
// };
const initState = [
  {
    code: 3,
    name: "조니워커 블랙 700ml",
    purchaseday: "2024-05-02",
    marketname: "포도대구동성로점",
    delivery: "PickUp",
  },
];
const CreateReview = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviewListData, setReviewListData] = useState(initState);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleReturnOrder = (_iDetails, _returncontents) => {
    // console.log("반품신청", _iDetails);
    const sendData = {
      contents: _returncontents,
      refundCnt: _iDetails.productCnt,
      refundPrice: _iDetails.price,
    };
    // console.log(sendData);
    postReviewcheck(_iDetails.idetails, {
      idetailData: sendData,
      // successFn: successFn_Return,
      // failFn: failFn_Return,
      // errorFn: errorFn_Return,
    });
  };
  useEffect(() => {
    getReviewcheck({
      successFn: data => {
        setReviewListData(data);
      },
      failFn: data => {
        alert("실패");
      },
      errorFn: data => {
        alert("서버상태 불안정 다음에 시도");
      },
    });
  }, []);

  const columns = [
    {
      title: "이미지",
      dataIndex: "name",
      render: () => (
        <img style={{ width: "80px" }} src="/images/moon.jpg" alt="리뷰 작성" />
      ),
    },
    {
      title: "제품명 | 주문번호",
      dataIndex: "test",
      render: (text, record) => (
        <div>
          <p>{record.name}</p>
          {/* <p>12121212-1212121</p> */}
        </div>
      ),
    },
    {
      title: "주문일자",
      dataIndex: "purchaseday",
    },
    {
      title: "매장명",
      dataIndex: "marketname",
    },
    {
      title: "주문방식",
      dataIndex: "delivery",
    },
    {
      title: "리뷰작성",
      button: <button>ddldldd</button>,
      render: () => <BasicBtR onClick={handleShowModal}>리뷰 작성</BasicBtR>,
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Common.color.p900,
        },
        components: {
          Table: {
            headerBg: "none",
            headerColor: Common.color.p500,
          },
        },
      }}
    >
      <TableCustom
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={reviewListData}
        pagination={false}
      />
      {showModal && <RvModal onClose={handleCloseModal} code={0} />}
    </ConfigProvider>
  );
};

export default CreateReview;
