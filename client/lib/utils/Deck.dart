import './Action.dart';

List _mapToActions(actionsMapList) {
  return actionsMapList.map<Action>((obj) {
    switch (obj["type"]) {
      case "PRESS":
        return PressAction(
          id: obj["id"],
          name: obj["name"],
          type: obj["type"],
          press: Press(
            obj["press"]["key"],
            modifier: obj["press"]["modifier"],
          ),
        );
        break;
      default:
        throw Error();
    }
  }).toList();
}

class Deck {
  final String id;
  final List<Action> actions;

  Deck(Map<String, dynamic> deckMap)
      : id = deckMap["id"],
        actions = _mapToActions(deckMap["actions"]);
}