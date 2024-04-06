"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Mypage() {
  const [postings, setPostings] = useState([]);
  const [page, setPage] = useState(1); // 초기 페이지를 1로 설정
  const [hasMore, setHasMore] = useState(true);
  const supabase = createClient();

  const fetchPosting = async (page) => { // page를 인자로 받도록 수정
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user.email;

    let { data: records, error } = await supabase
      .from("records")
      .select("*")
      .eq("email", email)
      .order('created_at', { ascending: false })
      .range(0, 3);
      // setPostings(prev => [...prev, ...records]);
    if(!error){
      setPostings(records)
    }
  };

  useEffect(() => {
    fetchPosting(page); // useEffect 내에서 page를 인자로 넘깁니다.
  }, []); // 의존성 배열을 비워 초기 마운트 시에만 실행되도록 합니다.

  const handleLoadMore =async (page) => {

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user.email;

    let { data: records, error } = await supabase
      .from("records")
      .select("*")
      .eq("email", email)
      .order('created_at', { ascending: false })
      .range(page*4, page *4+3);
    if(!error){
      setPostings(prev => [...prev, ...records]);
    }  

  };
  console.log("page:",page)
  console.log("postings:",postings)
  
  return (
    <>
      <header className="uui-section_heroheader11"></header>
      <section className="uui-section_layout94">
        <div className="uui-page-padding-3">
          <div className="uui-container-large-3">
            <div className="uui-padding-vertical-xhuge-2">
              <div className="uui-layout94_component">
                <div className="uui-max-width-large-2">
                  <div className="uui-heading-subheading-2">My Page</div>
                  <div className="uui-space-xsmall-2"></div>
                  <h2 className="uui-heading-medium-2">
                    과거로의 티켓, 당신의 텍스트가 영상으로 되살아납니다
                  </h2>
                  <div className="uui-space-xsmall-2"></div>
                  <div className="uui-text-size-large-2">
                    시간여행자 서비스로 과거의 소중한 순간들을 다시 방문하세요.
                    단지 몇 줄의 텍스트로 시작해, 우리는 그 순간들을 생생한
                    영상으로 재현해 드립니다.
                  </div>
                </div>
                <div className="w-layout-grid uui-layout94_list">
                  {postings &&
                    postings.map((elem, index) => {
                      return (
                        <div className="uui-layout94_item">
                          <div className="uui-layout94_item-content">
                            <div className="icon-featured-square-large">
                              <div className="uui-icon-1x1-xsmall-2 w-embed">
                                <svg
                                  width="24"
                                  height="24"
                                  viewbox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.09436 11.2288C6.03221 10.8282 5.99996 10.4179 5.99996 10C5.99996 5.58172 9.60525 2 14.0526 2C18.4999 2 22.1052 5.58172 22.1052 10C22.1052 10.9981 21.9213 11.9535 21.5852 12.8345C21.5154 13.0175 21.4804 13.109 21.4646 13.1804C21.4489 13.2512 21.4428 13.301 21.4411 13.3735C21.4394 13.4466 21.4493 13.5272 21.4692 13.6883L21.8717 16.9585C21.9153 17.3125 21.9371 17.4895 21.8782 17.6182C21.8266 17.731 21.735 17.8205 21.6211 17.8695C21.4911 17.9254 21.3146 17.8995 20.9617 17.8478L17.7765 17.3809C17.6101 17.3565 17.527 17.3443 17.4512 17.3448C17.3763 17.3452 17.3245 17.3507 17.2511 17.3661C17.177 17.3817 17.0823 17.4172 16.893 17.4881C16.0097 17.819 15.0524 18 14.0526 18C13.6344 18 13.2237 17.9683 12.8227 17.9073M7.63158 22C10.5965 22 13 19.5376 13 16.5C13 13.4624 10.5965 11 7.63158 11C4.66668 11 2.26316 13.4624 2.26316 16.5C2.26316 17.1106 2.36028 17.6979 2.53955 18.2467C2.61533 18.4787 2.65322 18.5947 2.66566 18.6739C2.67864 18.7567 2.68091 18.8031 2.67608 18.8867C2.67145 18.9668 2.65141 19.0573 2.61134 19.2383L2 22L4.9948 21.591C5.15827 21.5687 5.24 21.5575 5.31137 21.558C5.38652 21.5585 5.42641 21.5626 5.50011 21.5773C5.5701 21.5912 5.67416 21.6279 5.88227 21.7014C6.43059 21.8949 7.01911 22 7.63158 22Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                            <div className="uui-space-xxlarge"></div>
                            <h3 className="uui-heading-xxsmall-3">
                              제목 : {elem.title}
                            </h3>

                            <div className="uui-text-size-medium-3">
                              일시 : {formatTimestamp(elem.created_at)}
                            </div>
                            <div className="uui-text-size-medium-3">
                              내용 : {elem.description}
                            </div>
                            <div className="uui-button-wrapper-2 max-width-full-mobile-landscape">
                              <a className="uui-button-3 w-inline-block">
                                <div
                                  onClick={() => {
                                    deletePosting(elem.postingId);
                                  }}
                                >
                                  삭제
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div style={{width:"100%",display:'flex',justifyContent:'center'}} className="uui-button-row-2 is-reverse-mobile-landscape">
                  
                    <div className="uui-button-3 w-inline-block2">
                      <div onClick={()=>{
                        setPage(prev=>prev+1)
                        handleLoadMore(page)

                      }}>더보기</div>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function formatTimestamp(timestamp) {
  // Date 객체를 생성합니다.
  const date = new Date(timestamp);

  // 연도, 월, 일, 시, 분을 추출합니다.
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // 'XXXX-XX-XX XX:XX' 형식으로 결과를 반환합니다.
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
