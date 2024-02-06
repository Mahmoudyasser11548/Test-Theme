import React, { useState } from "react";
import { Col, Row, TabContent, TabPane } from "reactstrap";
import Tabs from "./Tabs";
import { useParams } from "react-router-dom";
import Wheel from "./Wheel";
import Rewards from "./Rewards";
import Segmants from "./Segmants";
import Fields from "./Fields";
import { Card } from "primereact/card";

const WholeTabs = () => {
  const { id: wheelId } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Row>
        <Col className="mb-2 mb-md-0" md="12">
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Wheel
                  activeTab={activeTab}
                  wheelId={wheelId === "new" && wheelId}
                />
              </TabPane>
              <TabPane tabId="2">
                <Fields
                  activeTab={activeTab}
                  wheelId={wheelId === "new" && wheelId}
                />
              </TabPane>
              <TabPane tabId="3">
                <Rewards
                  activeTab={activeTab}
                  wheelId={wheelId === "new" && wheelId}
                />
              </TabPane>
              <TabPane tabId="4">
                <Segmants
                  activeTab={activeTab}
                  wheelId={wheelId === "new" && wheelId}
                />
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WholeTabs;
