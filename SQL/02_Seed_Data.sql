USE [Upskate]
GO
SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Email], [FirebaseUserId], [DisplayName])
VALUES 
  (1, 'cdenmark@gmail.com', 'xx1fykAXaAVUFVnD9d8iKlK8fcH3','Chris'),
  (2, 'user@gmail.com', 'IpCblh0yKQP8RpGvDfl8qs3udeV2','Tim');
SET IDENTITY_INSERT [UserProfile] OFF
SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category]
  ([Id], [Name])
VALUES
  (1, 'Routine Maintenance'),
  (2, 'Part Swap');
SET IDENTITY_INSERT [Category] OFF
SET IDENTITY_INSERT [DeckMaterial] ON
INSERT INTO [DeckMaterial]
  ([Id], [Name])
VALUES
  (1, 'Maple'),
  (2, 'Bamboo'),
  (3, 'Composite'),
  (4, 'Plastic');
SET IDENTITY_INSERT [DeckMaterial] OFF
SET IDENTITY_INSERT [Type] ON
INSERT INTO [Type]
  ([Id], [Name])
VALUES
  (1, 'Longboard'),
  (2, 'Regular Board'),
  (3, 'Penny Board'),
  (4, 'Nickel Board'),
  (5, 'Old School Board');
  SET IDENTITY_INSERT [Type] OFF
SET IDENTITY_INSERT [Board] ON
INSERT INTO [Board]
  ([Id], [Name], [TypeId], [DeckMaterialId], [UserProfileId])
VALUES
  (1, 'C board', 1, 2, 1),
  (2, 'T board', 1, 3, 2);
SET IDENTITY_INSERT [Board] OFF
SET IDENTITY_INSERT [Upkeep] ON
INSERT INTO [Upkeep]
  ([Id], [CategoryId], [Description], [DateCompleted], [BoardId], [UserProfileId])
VALUES
  (1, 1, 'Oiled bearings', '05-03-2021', 1, 1);
SET IDENTITY_INSERT [Upkeep] OFF