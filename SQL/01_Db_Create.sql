USE [master]
GO
IF db_id('Upskate') IS NULL
	CREATE DATABASE [Upskate]
GO
USE [Upskate]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Board];
DROP TABLE IF EXISTS [Upkeep];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [BoardType];
DROP TABLE IF EXISTS [DeckMaterial];

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Board] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [BoardTypeId] integer NOT NULL,
  [DeckMaterialId] integer NOT NULL,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [Upkeep] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Categoryid] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [DateCompleted] datetime,
  [BoardId] integer NOT NULL,
  [UserProfileId] integer NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [BoardType] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [DeckMaterial] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([Categoryid]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Upkeep] ADD FOREIGN KEY ([BoardId]) REFERENCES [Board] ([Id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([DeckMaterialId]) REFERENCES [DeckMaterial] ([Id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([BoardTypeId]) REFERENCES [BoardType] ([Id])
GO

ALTER TABLE [Board] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
