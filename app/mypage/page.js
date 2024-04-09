"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Mypage() {
  const [postings, setPostings] = useState([]);
  const [page, setPage] = useState(1); // 초기 페이지를 1로 설정
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState("");
  // 오디오 컨트롤러 표시 상태와 src 관리를 위한 state
  const [currentAudio, setCurrentAudio] = useState({
    postingId: null,
    playing: false,
  });

  // 오디오 재생을 관리하는 함수
  const playAudio = (postingId, filePath) => {
    setCurrentAudio({
      postingId,
      playing: true,
    });
  };

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // If no user is found, redirect to the /login page
        router.push("/login");
      } else {
        setUser(user); // Save the user data if found
      }
    };

    checkUser();
  }, [router]); // Depend on router to avoid exhaustive deps warning

  const fetchPosting = async (page) => {
    // page를 인자로 받도록 수정
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user?.email;

    let { data: records, error } = await supabase
      .from("records")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .range(0, 3);
    // setPostings(prev => [...prev, ...records]);
    if (!error) {
      setPostings(records);
    }
  };

  useEffect(() => {
    fetchPosting(page); // useEffect 내에서 page를 인자로 넘깁니다.
  }, []); // 의존성 배열을 비워 초기 마운트 시에만 실행되도록 합니다.

  const handleLoadMore = async (page) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const email = user.email;

    let { data: records, error } = await supabase
      .from("records")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .range(page * 4, page * 4 + 3);
    if (!error) {
      setPostings((prev) => [...prev, ...records]);
    }
  };

  const deletePosting = async (postingId) => {
    const { error } = await supabase
      .from("records")
      .delete()
      .eq("postingId", postingId);

    fetchPosting();
  };

  // SVG 클릭 핸들러: 여기서는 예시로 하드코드된 src 값을 사용합니다.
  // 실제로는 이 값을 동적으로 받아올 수 있습니다.

  return (
    <>
      {user && (
        <>
          <header className="uui-section_heroheader11"></header>
          <section className="uui-section_layout94">
            <div className="uui-page-padding-3">
              <div className="uui-container-large-3">
                <div className="uui-padding-vertical-xhuge-2">
                  <div className="uui-layout94_component">
                    <div className="uui-max-width-large-2">
                      <div className="uui-heading-subheading-2">내 정보</div>
                      <div className="uui-space-xsmall-2"></div>
                      <h2 className="uui-heading-medium-2">
                      과거로의 선물, 당신의 목소리가 영상으로 되살아납니다
                      </h2>
                      <div className="uui-space-xsmall-2"></div>
                      <div className="uui-text-size-large-2">
                      메모리 페이지의 서비스로 과거의 소중한 순간들을 다시 방문하세요. 
우리는 그 순간들을 생생한 영상으로 재현해 드립니다.
                      </div>
                    </div>
                    <div className="w-layout-grid uui-layout94_list">
                      {postings &&
                        postings.map((elem, index) => {
                          return (
                            <div className="uui-layout94_item" key={index}>
                              <div className="uui-layout94_item-content">
                                <div className="icon-container">
                                  <div className="icon-featured-square-large">
                                    <div
                                      className="uui-icon-1x1-xsmall-2 w-embed"
                                      onClick={() =>
                                        playAudio(elem.postingId, elem.filePath)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  {currentAudio.postingId === elem.postingId &&
                                    currentAudio.playing && (
                                      <audio
                                        controls
                                        autoPlay
                                        src={elem.filePath}
                                      >
                                        Your browser does not support the audio
                                        element.
                                      </audio>
                                    )}
                                </div>

                                <div
                                  style={{
                                    margin: "1rem 0 1rem 0",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <span>#{elem.categoryBig}</span>
                                  <span>#{elem.categorySmall}</span>
                                </div>
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
                                      className="delete-button"
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
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="uui-button-row-2 is-reverse-mobile-landscape"
                    >
                      <div className="uui-button-3 w-inline-block2">
                        <div
                          onClick={() => {
                            setPage((prev) => prev + 1);
                            handleLoadMore(page);
                          }}
                        >
                          더보기
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
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
  return `${year}년${month}월${day}일 ${hours}시${minutes}분`;
}
