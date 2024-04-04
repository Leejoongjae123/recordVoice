import React from "react";

export default function Upload() {
  return (
    <section class="uui-section_contact02">
      <div class="uui-page-padding-3">
        <div class="uui-container-small">
          <div class="uui-padding-vertical-xhuge-2">
            <div class="uui-text-align-center-2">
              <div class="uui-max-width-large-2 align-center">
                <div class="uui-heading-subheading-2">Upload Your Memory</div>
                <h2 class="uui-heading-medium-2">업로드</h2>
                <div class="uui-space-xsmall-2"></div>
                <div class="uui-text-size-large-2">
                  감성 디지털화 서비스는 당신의 말과 글을 넘어서는 경험을
                  제공합니다.
                </div>
              </div>
            </div>
            <div class="uui-contact02_component w-form">
              <div
                id="wf-form-Contact-02-form"
                name="wf-form-Contact-02-form"
                data-name="Contact 02 form"
                method="get"
                class="uui-contact02_form"
                data-wf-page-id="660c1c6d3dc8e9d96341e88b"
                data-wf-element-id="d19b111f-c02d-ece5-a0c7-33c8e050dd3f"
              >
                <div class="form-field-2col">
                  <div class="uui-form-field-wrapper">
                    <label for="Contact-02-first-name" class="uui-field-label">
                      제목
                    </label>
                    <input
                      class="uui-form_input-2 w-input"
                      maxLength="256"
                      name="Contact-02-first-name"
                      data-name="Contact 02 first name"
                      placeholder="제목"
                      type="text"
                      id="Contact-02-first-name"
                      required=""
                    />
                  </div>
                </div>
                <div class="uui-form-field-wrapper">
                  <label for="Contact-02-select" class="uui-field-label">
                    대분류1
                  </label>
                  <select
                    id="Contact-02-select"
                    name="Contact-02-select"
                    data-name="Contact 02 select"
                    required=""
                    class="uui-form_input-2 select w-select"
                  >
                    <option value="">선택하세요</option>
                    <option value="First">First Choice</option>
                    <option value="Second">Second Choice</option>
                    <option value="Third">Third Choice</option>
                  </select>
                </div>
                <div
                  id="w-node-_6f35a2c8-c584-7d24-5c97-a078e8c56621-6341e88b"
                  class="uui-form-field-wrapper"
                >
                  <label for="Contact-02-select-2" class="uui-field-label">
                    대분류2
                  </label>
                  <select
                    id="Contact-02-select-2"
                    name="Contact-02-select-2"
                    data-name="Contact 02 Select 2"
                    required=""
                    class="uui-form_input-2 select w-select"
                  >
                    <option value="">선택하세요</option>
                    <option value="First">First Choice</option>
                    <option value="Second">Second Choice</option>
                    <option value="Third">Third Choice</option>
                  </select>
                </div>
                <div class="uui-form-field-wrapper">
                  <label for="Contact-02-message" class="uui-field-label">
                    설명
                  </label>
                  <textarea
                    id="Contact-02-message"
                    name="Contact-02-message"
                    maxLength="5000"
                    data-name="Contact 02 message"
                    placeholder="Type your message..."
                    required=""
                    class="uui-form_input-2 text-area w-input"
                  ></textarea>
                </div>
                <label
                  id="Contact-2-Checkbox"
                  class="w-checkbox uui-form-checkbox"
                >
                  <div class="w-checkbox-input w-checkbox-input--inputType-custom uui-form-checkbox-icon"></div>
                  <input
                    id="Contact-02-checkbox"
                    type="checkbox"
                    name="Contact-02-checkbox"
                    data-name="Contact 02 checkbox"
                    required=""
                    // style="opacity:0;position:absolute;z-index:-1"
                    style={{opacity:0,position:"absolute",zIndex:-1}}
                  />
                  <span
                    for="Contact-02-checkbox"
                    class="uui-form-checkbox-label w-form-label"
                  >
                    You agree to our friendly{" "}
                    <a href="#" class="uui-text-style-link-2">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>
                <div
                  id="w-node-d19b111f-c02d-ece5-a0c7-33c8e050dd7d-6341e88b"
                  class="uui-form-button-wrapper"
                >
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    id="w-node-d19b111f-c02d-ece5-a0c7-33c8e050dd7e-6341e88b"
                    class="uui-button-3 w-button"
                    value="Record"
                  />
                </div>
                <div
                  id="w-node-_117f8182-6ab1-24fe-b8b6-2da55d62a248-6341e88b"
                  class="uui-form-button-wrapper"
                >
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    id="w-node-_117f8182-6ab1-24fe-b8b6-2da55d62a249-6341e88b"
                    class="uui-button-3 w-button"
                    value="Upload"
                  />
                </div>
              </div>
              <div class="success-message-2 w-form-done">
                <div class="success-text">
                  Thank you! Your submission has been received!
                </div>
              </div>
              <div class="error-message-2 w-form-fail">
                <div class="error-text">
                  Oops! Something went wrong while submitting the form.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
