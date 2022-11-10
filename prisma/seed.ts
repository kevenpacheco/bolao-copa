import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

(async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatarUrl: 'https://github.com/kevenpacheco.png'
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Diego Fernandes',
      email: 'diego.fernandes@example.com',
      avatarUrl: 'https://github.com/diego3g.png'
    }
  })

  const user3 = await prisma.user.create({
    data: {
      name: 'Filipe Deschamps',
      email: 'filipe.deschamps@example.com',
      avatarUrl: 'https://github.com/filipedeschamps.png'
    }
  })

  const user4 = await prisma.user.create({
    data: {
      name: 'Mayk Brito',
      email: 'mayk.brito@example.com',
      avatarUrl: 'https://github.com/maykbrito.png'
    }
  })

  const user5 = await prisma.user.create({
    data: {
      name: 'Rodrigo Gonçalves',
      email: 'rodrigo.goncalves@example.com',
      avatarUrl: 'https://github.com/rodrigorgtic.png'
    }
  })

  const user6 = await prisma.user.create({
    data: {
      name: 'Jakeliny Gracielly',
      email: 'jakeliny.gracielly@example.com',
      avatarUrl: 'https://github.com/jakeliny.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemple Pool',
      code: 'BOL123',
      ownerId: user1.id,

      participants: {
        create: [
          {
            userId: user1.id,
            points: 54
          },
          {
            userId: user2.id,
            points: 39
          },
          {
            userId: user3.id,
            points: 78
          },
          {
            userId: user4.id,
            points: 37
          },
          {
            userId: user5.id,
            points: 10
          },
          {
            userId: user6.id,
            points: 27
          },
        ]
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user1.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2023-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'CL',
      secondTeamCountryCode: 'CO',
    }
  })

  await prisma.game.create({
    data: {
      date: '2023-11-03T12:00:00.201Z',
      firstTeamCountryCode: 'FR',
      secondTeamCountryCode: 'ES',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user1.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
})()