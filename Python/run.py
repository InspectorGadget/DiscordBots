from discord.ext.commands import Bot
from discord import Game
import random
import requests
import asyncio

BOT_PREFIX = ("?", "!")
BOT_TOKEN = ""

client = Bot(command_prefix = BOT_PREFIX)

@client.command(
    name='8ball',
    description='Answer a yes/no questions',
    brief='Answers from the beyond',
    pass_context = True
)
async def eight_ball(context):
    possible_responses = [
        "This is fat no",
        "It is not looking likely",
        "Too hard to tell",
        "It is quite possible",
        "Definitely"
    ]
    await client.say(random.choice(possible_responses) + ", " + context.message.author.mention)

@client.command(
    description='Square a number',
    brief='Returns a square number'
)
async def square(number):
    square = int(number) * int(number)
    await client.say(str(number) + " squared is " + str(square))

@client.event
async def on_ready():
    await client.change_presence(game=Game(name="with humans"))
    print("Logged in as: " + client.user.name)

@client.command(
    brief='Returns a square number'
)
async def bitcoin():
    url = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
    response = requests.get(url)
    value = response.json()['bpi']['USD']['rate']
    await client.say("Bitcoin price is: $" + value)


# Backgroud Task
async def list_servers():
    await client.wait_until_ready()
    while not client.is_closed:
        print("Current servers:")
        for server in client.servers:
            print(server.name)
        await asyncio.sleep(6)


client.loop.create_task(list_servers())
client.run(BOT_TOKEN)