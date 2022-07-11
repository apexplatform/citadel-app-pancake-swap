import ROUTES from "../../routes";
import { useSelector } from "react-redux";
import Header from "@citadeldao/apps-ui-kit/dist/components/uiKit/Header";
import text from "../../text.json";
import { Config } from '../config/config';
import Content from '@citadeldao/apps-ui-kit/dist/components/uiKit/Content';
import moment from "moment";
import BigNumber from "bignumber.js";
import CustomIcons from '@citadeldao/apps-ui-kit/dist/components/uiKit/CustomIcons';
import '../styles/panels/transactions.css';
import { useNavigate } from 'react-router-dom';
import { fotmatAddress } from '../helpers/addressFormatter'
const TransactionDetails = (props) => {
  const config = new Config()
  const data = useSelector(state => state.transaction.openedTransaction)
  const navigate = useNavigate()
  const back = () => navigate(ROUTES.TRANSACTIONS + '?' + window.location.search.slice(1))
  return (
    <div className="panel">
      <Header config={config} title={text.TRANSACTIONS_DETAILS} onClick={() => back()} back={true} />
      <Content>
      <div className="transaction-details">
      {data.to?.value && <div className="transaction-details-row">
        <p className="transaction-description-text">Send to</p>
        <span>{fotmatAddress(data.to?.value)}</span>
      </div>}
      <div className="transaction-details-row">
        <p className="transaction-description-text">Amount</p>
        <span
          className="transactions-status"
          id={+data.amount?.value?.amount < 0 ? "red-amount-text" : undefined}
        >
          {BigNumber(data.amount?.value?.amount).toFixed()}{" "}
          <span className="description-text">{data.amount?.value?.ticker}</span>
        </span>
      </div>
      <div className="transaction-details-row">
        <p className="transaction-description-text">Fee</p>
        <span className="transactions-details-fee">
          {data.fee?.value?.amount || 0}{" "}
          <span className="transaction-description-text">
            {data.fee?.value?.ticker || "OSMO"}
          </span>
        </span>
      </div>
      <div className="transaction-details-row">
        <p className="transaction-description-text">Status</p>
        <span
          className={
            data.status?.value === "Success"
              ? "transactions-status"
              : "transactions-status-failed"
          }
        >
          {data.status?.value}
        </span>
      </div>
      <div className="transaction-details-row">
        <p className="transaction-description-text">Time & data</p>
        <p className="transaction-description-text">{moment().from(data.date?.value)}</p>
      </div>
      {data?.meta_info?.length && data?.meta_info?.map((item, i) => (
        <div className="transaction-details-row" key={i}>
          <p className="transaction-description-text">{item?.title}</p>
          <div className="transaction-details-row">
            <span>{item?.value?.text || item?.value} </span>
            {item?.value?.url ? (
              <a
                href={item?.value?.url}
                target="_blank"
                style={{ cursor: "pointer" }}
                rel="noreferrer"
                className='transaction-link'
              >
                <CustomIcons icon='link' />
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
      <div className="transaction-details-row">
        <div className="transaction-description-text">{text.VIEW_TRANSACTION}
        <a href={data.wallet.getTxUrl(data?.hash?.value)} className='transaction-link' target='_blank' rel="noreferrer"><CustomIcons icon='link' /></a></div>
      </div>
      {data?.comment?.value ? (
        <div>
          <p className="transaction-description-text">Comment</p>
          <p>{data?.comment?.value}</p>
        </div>
      ) : (
        ""
      )}
    </div>
      </Content>
    </div>
  );
};

export default TransactionDetails