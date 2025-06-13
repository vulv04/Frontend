import React from "react";
import styled from "@emotion/styled";
import video from "../../assets/video/video.mp4";
import imgs_video from "../../assets/imgs/video_image.png";

const Section = styled.section`
  position: relative;
  color: white;
  overflow: hidden;
`;

const VideoBg = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.5;
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  padding: 3rem 0;
`;

const ContentWrapper = styled.div`
  background-color: white;
  color: #212529;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FlexFill = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: ${(props) => (props.left ? "start" : "center")};
  }
`;

const Btn = styled.button`
  background-color: #0d6efd;
  border: none;
  padding: 0.375rem 1.5rem;
  border-radius: 50rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const HeadingDark = styled.h2`
  font-weight: 700;
  margin-bottom: 3rem;
  color: #212529;
`;

const TextDanger = styled.p`
  color: #dc3545;
  font-weight: 600;
`;

const SpecialCollections = () => {
  return (
    <Section>
      <VideoBg
        autoPlay
        muted
        loop
        playsInline
        src={video}
        type="video/mp4"
        aria-hidden="true"
      />
      <Container>
        <HeadingDark>BỘ SƯU TẬP ĐẶC BIỆT</HeadingDark>
        <ContentWrapper>
          <FlexFill left>
            <h5 style={{ fontWeight: "700" }}>PHIÊN BẢN GIỚI HẠN</h5>
            <h4>Áo Thun Make Your Own Trail</h4>
            <TextDanger>Sắp mở bán...</TextDanger>
            <Btn>ĐẶT HÀNG TRƯỚC</Btn>
          </FlexFill>
          <FlexFill>
            <img
              src={imgs_video}
              alt="Limited Product"
              style={{
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "0.375rem",
                maxWidth: "100%",
              }}
            />
          </FlexFill>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default SpecialCollections;
