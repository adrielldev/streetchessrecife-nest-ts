<div align="center">
<h1>Street Chess Recife API </h1>

<img src="assets/logo.jpg" alt="drawing" width="600"/>


---


</div>

- [Player](#Player)
    - [Create Player](#create-player)
        - [Create Player Request](#create-player-request)
        - [Create Player Response](#create-player-response)
    - [Get All Players](#get-all-players)
        - [Get All Players Request](#get-all-players-request)
        - [Get All Players Response](#get-all-players-response)
    - [Get Player](#get-player),
       - [Get Player Request](#get-player-request)
       - [Get Player Response](#get-player-response)
    - [Put Player](#put-player),
        - [Put Player Request](#put-player-request)
        - [Put Player Response](#put-player-response)
    - [Delete Player](#delete-player),
        - [Delete Player Request](#delete-player-request)
        - [Delete Player Response](#delete-player-response)
    - [Get Ranking](#get-ranking),
        - [Get Ranking Request](#get-ranking-request)
        - [Get Ranking Response](#get-ranking-response)
- [Games](#Games)
    - [Create Game](#create-game)
        - [Create Game Request](#create-game-request)
        - [Create Game Response](#create-game-response)
    - [Get All Games](#get-all-games)
        - [Get All Games Request](#get-all-games-request)
        - [Get All Games Response](#get-all-games-response)
    - [Get Game](#get-game)
       - [Get Game Request](#get-game-request)
       - [Get Game Response](#get-game-response)
    - [Put Game](#put-game)
        - [Put Game Request](#put-game-request)
        - [Put Game Response](#put-game-response)
    - [Delete Game](#delete-game)
        - [Delete Game Request](#delete-game-request)
        - [Delete Game Response](#delete-game-response)
    - [Get All Games Player](#get-all-games-player)
        - [Get All Games Player Request](#get-all-games-player-request)
        - [Get All Games Player Response](#get-all-games-player-response)
    - [Get All White Games Player](#get-all-white-games-player)
        - [Get All White Games Player Request](#get-all-white-games-player-request)
        - [Get All White Games Player Response](#get-all-white-games-player-response)
    - [Get All Black Games Player](#get-all-black-games-player)
        - [Get All Black Games Player Request](#get-all-black-games-player-request)
        - [Get All Black Games Player Response](#get-all-black-games-player-response)
    - [Get All Victories Player](#get-all-victories-player)
        - [Get All Victories Player Request](#get-all-victories-player-request)
        - [Get All Victories Player Response](#get-all-victories-player-response)
    - [Get All Draws Player](#get-all-draws-player)
        - [Get All Draws Player Request](#get-all-draws-player-request)
        - [Get All Draws Player Response](#get-all-draws-player-response)
    - [Get All Loses Player](#get-all-loses-player)
        - [Get All Loses Player Request](#get-all-loses-player-request)
        - [Get All Loses Player Response](#get-all-loses-player-response)
    - [Get All Games Player Versus Other](#get-all-games-player-vs-other)
        - [Get All Games Player Versus Other Request](#get-all-games-player-vs-other-request)
        - [Get All Games Player Versus Other Response](#get-all-games-player-vs-otherresponse)

    



# Player


## Create Player

### Create Player Request

```js
POST /player
```

```json
{
	"username":"fischer",
	"name":"Bobby Fischer"
}
```

### Create Player Response

```js
201 Created
```

```json
{
	"id": 1190,
	"name": "Bobby Fischer",
	"username": "fischer",
	"rating_rapid": 1500,
	"victories": 0,
	"draws": 0,
	"loses": 0,
	"created_at": "2023-07-09T23:04:11.113Z",
	"updated_at": "2023-07-09T23:04:11.113Z"
}
```

## Get All Players

### Get All Players Request

```js
GET /player
```


### Get All Players Response

```js
200 OK
```

```json
    [
	{
		"id": 1189,
		"name": "Anatoly Karpov",
		"username": "anatoly.karpov",
		"rating_rapid": 1521,
		"victories": 2,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-06-26T11:35:44.560Z",
		"updated_at": "2023-06-26T11:36:32.563Z",
		"black_games": [],
		"white_games": []
	},
	{
		"id": 1190,
		"name": "Bobby Fischer",
		"username": "fischer",
		"rating_rapid": 1500,
		"victories": 0,
		"draws": 0,
		"loses": 0,
		"created_at": "2023-07-09T23:04:11.113Z",
		"updated_at": "2023-07-09T23:04:11.113Z",
		"black_games": [],
		"white_games": []
	}
]

```

# Get Player

### Get Player Request

```js
GET /player/:id
```


### Get Player Response


```js
200 OK
```

```json
    {
	"id": 1189,
	"name": "Anatoly Karpov",
	"username": "anatoly.karpov",
	"rating_rapid": 1521,
	"victories": 2,
	"draws": 0,
	"loses": 1,
	"created_at": "2023-06-26T11:35:44.560Z",
	"updated_at": "2023-06-26T11:36:32.563Z"
}

```

#  Put Player

###  Put Player Request

```js
PUT  /player/:id
```

```json
{
	"username":"fischer",
	"name":"Bobby Fischer",
    "victories":1,
    "loses":0,
    "draws":0,
	"rating_rapid":2800,

}
```


### Put Player Response


```js
200 OK
```

```json
    {
	"id": 1189,
	"name": "Anatoly Karpov",
	"username": "anatoly.karpov",
	"rating_rapid": 1521,
	"victories": 2,
	"draws": 0,
	"loses": 1,
	"created_at": "2023-06-26T11:35:44.560Z",
	"updated_at": "2023-06-26T11:36:32.563Z"
}

```

#  Delete Player

###  Delete Player Request

```js
DELETE  /player/:id
```




### Delete Player Response

```js
204 NO CONTENT
```

# Get Ranking

### Get Ranking Request

```js
GET /player/ranking
```

### Get Ranking Response

```js
200 OK
```

```json
[
	{
		"id": 1189,
		"name": "Anatoly Karpov",
		"username": "anatoly.karpov",
		"rating_rapid": 1521,
		"victories": 2,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-06-26T11:35:44.560Z",
		"updated_at": "2023-06-26T11:36:32.563Z"
	},
	{
		"id": 1190,
		"name": "Bobby Fischer",
		"username": "fischer",
		"rating_rapid": 1500,
		"victories": 0,
		"draws": 0,
		"loses": 0,
		"created_at": "2023-07-09T23:04:11.113Z",
		"updated_at": "2023-07-09T23:04:11.113Z"
	}
]
```

# Games

## Create Game

### Create Game Request

```js
POST /game
```

```json
{
	"result":"w",
	"white_player":"anatoly.karpov",
	"black_player":"fischer"
}
```

### Create Game Response

```js
201 Created
```

```json
{
	"id": 381,
	"date_game": "2023-07-09T23:31:26.470Z",
	"result": "w",
	"rating_white_player": 1535,
	"rating_black_player": 1486,
	"white_player_id": 1189,
	"black_player_id": 1190,
	"white_player": {
		"id": 1189,
		"name": "Anatoly Karpov",
		"username": "anatoly.karpov",
		"rating_rapid": 1535,
		"victories": 3,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-06-26T11:35:44.560Z",
		"updated_at": "2023-07-09T23:31:26.444Z"
	},
	"black_player": {
		"id": 1190,
		"name": "Bobby Fischer",
		"username": "fischer",
		"rating_rapid": 1486,
		"victories": 0,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-07-09T23:04:11.113Z",
		"updated_at": "2023-07-09T23:31:26.457Z"
	}
}
```

## Get All Games

### Get All Games Request

```js
GET /games
```


### Get All Games Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

# Get Game

### Get Game Request

```js
GET /games/:id
```


### Get Game Response


```js
200 OK
```

```json
{
	"id": 381,
	"date_game": "2023-07-09T23:31:26.470Z",
	"result": "w",
	"rating_white_player": 1535,
	"rating_black_player": 1486,
	"white_player_id": 1189,
	"black_player_id": 1190,
	"black_player": {
		"id": 1190,
		"name": "Bobby Fischer",
		"username": "fischer",
		"rating_rapid": 1486,
		"victories": 0,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-07-09T23:04:11.113Z",
		"updated_at": "2023-07-09T23:31:26.457Z"
	},
	"white_player": {
		"id": 1189,
		"name": "Anatoly Karpov",
		"username": "anatoly.karpov",
		"rating_rapid": 1535,
		"victories": 3,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-06-26T11:35:44.560Z",
		"updated_at": "2023-07-09T23:31:26.444Z"
	}
}

```

#  Put Game

###  Put Game Request

```js
PUT  /game/:id
```

```json
{
	"result":"b"
}
```


### Put Game Response


```js
200 OK
```

```json
   {
	"id": 381,
	"date_game": "2023-07-09T23:31:26.470Z",
	"result": "b",
	"rating_white_player": 1535,
	"rating_black_player": 1486,
	"white_player_id": 1189,
	"black_player_id": 1190,
	"black_player": {
		"id": 1190,
		"name": "Bobby Fischer",
		"username": "fischer",
		"rating_rapid": 1486,
		"victories": 0,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-07-09T23:04:11.113Z",
		"updated_at": "2023-07-09T23:31:26.457Z"
	},
	"white_player": {
		"id": 1189,
		"name": "Anatoly Karpov",
		"username": "anatoly.karpov",
		"rating_rapid": 1535,
		"victories": 3,
		"draws": 0,
		"loses": 1,
		"created_at": "2023-06-26T11:35:44.560Z",
		"updated_at": "2023-07-09T23:31:26.444Z"
	}
}

```

#  Delete Game

###  Delete Game Request

```js
DELETE  /game/:id
```




### Delete Game Response

```js
204 NO CONTENT
```

## Get All Games Player

### Get All Games Player Request

```js
GET /games/player/:player_id
```


### Get All Games Player Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All White Games Player

### Get All White Games Request

```js
GET /games/player/:player_id
```


### Get All White Games Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All Black Games Player

### Get All Black Games Player Request

```js
GET /games/player/:player_id
```


### Get All Black Games Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All Victories Player

### Get All Victories Player Request

```js
GET /games/player/:player_id
```


### Get All Victories Player Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All Draws Player

### Get All Draws Player Request

```js
GET /games/player/:player_id
```


### Get All Draws Player Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "d",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All Loses Player

### Get All Loses Request

```js
GET /games/player/:player_id
```


### Get All Loses Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```

## Get All Games Player Versus Other

### Get All Games Player Versus Other Request

```js
GET /games/player/:player_id/:other_player:id
```


### Get All Games Player Versus Other Response

```js
200 OK
```

```json
   [
	{
		"id": 381,
		"date_game": "2023-07-09T23:31:26.470Z",
		"result": "w",
		"rating_white_player": 1535,
		"rating_black_player": 1486,
		"white_player_id": 1189,
		"black_player_id": 1190,
		"white_player": {
			"id": 1189,
			"name": "Anatoly Karpov",
			"username": "anatoly.karpov",
			"rating_rapid": 1535,
			"victories": 3,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-06-26T11:35:44.560Z",
			"updated_at": "2023-07-09T23:31:26.444Z"
		},
		"black_player": {
			"id": 1190,
			"name": "Bobby Fischer",
			"username": "fischer",
			"rating_rapid": 1486,
			"victories": 0,
			"draws": 0,
			"loses": 1,
			"created_at": "2023-07-09T23:04:11.113Z",
			"updated_at": "2023-07-09T23:31:26.457Z"
		}
	}
]

```


