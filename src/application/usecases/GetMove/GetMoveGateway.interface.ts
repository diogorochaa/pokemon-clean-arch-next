import GetMoveInput from "./GetMoveInput";
import GetMoveOutput from "./GetMoveOutput";

export default interface GetMoveGateway {
  byId(input: GetMoveInput): Promise<GetMoveOutput>;
}