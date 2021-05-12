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
  [DisplayName] nvarchar(255) NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
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

CREATE TABLE [Board] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [BoardTypeId] integer NOT NULL,
  [DeckMaterialId] integer NOT NULL,
  [UserProfileId] integer NOT NULL

  CONSTRAINT [FK_Board_BoardType] FOREIGN KEY ([BoardTypeId]) REFERENCES [BoardType] ([Id]),
  CONSTRAINT [FK_Board_DeckMaterial] FOREIGN KEY ([DeckMaterialId]) REFERENCES [DeckMaterial] ([Id]),
  CONSTRAINT [FK_Board_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [Upkeep] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Categoryid] integer NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [DateCompleted] date,
  [BoardId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Upkeep_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Upkeep_Board] FOREIGN KEY ([BoardId]) REFERENCES [Board] ([Id]),
  CONSTRAINT [FK_Upkeep_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO