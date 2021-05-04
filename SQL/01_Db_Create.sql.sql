USE [master]
GO
IF db_id('Upskate') IS NULL
	CREATE DATABASE [Upskate]
GO
USE [Upskate]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Board];
DROP TABLE IF EXISTS [Upkeep];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [DeckMaterial];

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Board] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [TypeId] integer NOT NULL,
  [DeckMaterialId] integer NOT NULL,
  [UserId] integer NOT NULL
)
GO

CREATE TABLE [Upkeep] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Categoryid] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [DateCompleted] datetime,
  [BoardId] integer NOT NULL,
  [UserId] integer NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Type] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [DeckMaterial] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([categoryid]) REFERENCES [Category] ([id])
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([boardId]) REFERENCES [Board] ([id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([deckMaterialId]) REFERENCES [deckMaterial] ([id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([typeId]) REFERENCES [type] ([id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO
