import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import sinon from "sinon";
import { AllCards, SingleCard } from "../components/";
import { cardData } from "../../script/seed";

describe.only("AllCards Component", () => {
  let wrapper;
  let listAll = sinon.spy();
  beforeEach("set up wrapper", () => {
    wrapper = shallow(<SingleCard card={cardData[0]} listAll={listAll} />);
  });

  it("displays the card's name, hp/mp, and attacks", () => {
    // const img = wrapper.find("Image");
    // expect(img.html()).to.include(puppy.image);
    const text = wrapper.text();
    expect(text).to.include(card.hp);
    expect(text).to.include(card.mp);
  });

  xit("invokes `pickPuppy` with the correct ID when puppy is clicked", () => {
    puppies.forEach(puppy => {
      const matchingDiv = divs.filterWhere(div => div.text() === puppy.name);
      matchingDiv.simulate("click");
      expect(pickPuppy.calledWith(puppy.id)).to.be.true;
    });
  });
});
